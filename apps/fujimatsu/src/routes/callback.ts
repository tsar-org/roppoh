import { Hono } from "hono";
import * as v from "valibot";
import type { Env } from "../middlewares/dependency-injection";
import {
  emailNotVerified,
  invalidState,
  serverError,
} from "../utils/error-response";
import { oidcValidator } from "../utils/oidc-validator";

const querySchema = v.object({
  code: v.pipe(v.string(), v.minLength(1)),
  state: v.pipe(v.string(), v.minLength(1)),
});

export const callbackRoute = new Hono<Env>().get(
  "",
  oidcValidator("query", querySchema),
  async (c) => {
    const { code, state } = c.req.valid("query");
    const decodedState = c.env.oidcStateCodecService.decode(state);

    if (!decodedState) {
      return invalidState(c, "OIDC state codec error. Failed to decode state.");
    }

    try {
      const tokenResponse = await c.env.discordService.exchangeCodeForToken({
        client_id: decodedState.clientId,
        client_secret: c.env.DISCORD_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: c.env.DISCORD_REDIRECT_URL,
      });

      const userInfo = await c.env.discordService.getUserInfo({
        accessToken: tokenResponse.access_token,
      });

      if (!userInfo.verified) {
        console.warn("⚠️ User email not verified");
        return emailNotVerified(c, "User email is not verified");
      }

      // store
      const id = c.env.AUTH_CODE_STORE.idFromName("default");
      const store = c.env.AUTH_CODE_STORE.get(id);
      await store.issue({
        clientId: decodedState.clientId,
        code: tokenResponse.access_token,
        expiresAt: Date.now() + tokenResponse.expires_in,
        redirectUri: decodedState.redirectUri,
        scope: decodedState.scope,
        subject: userInfo.id,
      });

      // generate redirect url
      const redirectUrl = new URL(decodedState.redirectUri);
      redirectUrl.searchParams.set("code", tokenResponse.access_token);
      if (decodedState.state) {
        redirectUrl.searchParams.set("state", decodedState.state);
      }

      return c.redirect(redirectUrl);
    } catch (error) {
      console.error("Discord service error:", error);
      return serverError(
        c,
        "Failed to exchange authorization code with Discord",
      );
    }
  },
);
