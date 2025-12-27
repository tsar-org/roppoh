import { Hono } from "hono";
import * as v from "valibot";
import type { DiscordService } from "@/services/discord-service";
import type { KeyPairService } from "@/services/keypair-service";
import * as jwt_lib from "../lib/jwt";
import type { Env } from "../middlewares/dependency-injection";
import {
  invalidGrant,
  invalidRequest,
  serverError,
  unsupportedGrantType,
} from "../utils/error-response";
import { oidcValidator } from "../utils/oidc-validator";

const tokenFormSchema = v.object({
  client_id: v.pipe(v.string(), v.minLength(1)),
  client_secret: v.pipe(v.string(), v.minLength(1)),
  code: v.pipe(v.string(), v.minLength(1)),
  grant_type: v.string(),
  redirect_uri: v.pipe(v.string(), v.url()),
});

export const tokenRoute = new Hono<Env>().post(
  "",
  oidcValidator("form", tokenFormSchema),
  async (c) => {
    // di
    const keyPairService =
      await c.env.container.getAsync<KeyPairService>("keyPairService");
    const discordService =
      await c.env.container.getAsync<DiscordService>("DiscordService");

    const { code, client_id, grant_type, redirect_uri } = c.req.valid("form");

    if (grant_type !== "authorization_code") {
      c.header("Cache-Control", "no-store");
      return unsupportedGrantType(c, "Only authorization_code is supported");
    }

    const keyPair = await keyPairService.loadOrGenerate(c.env.KV);

    const id = c.env.AUTH_CODE_STORE.idFromName("default");
    const store = c.env.AUTH_CODE_STORE.get(id);
    const authCode = await store.consume({
      clientId: client_id,
      code: code,
      redirectUri: redirect_uri,
    });

    if (!authCode) {
      c.header("Cache-Control", "no-store");
      return invalidGrant(c, "Invalid authorization code");
    }

    try {
      const userInfo = await discordService.getUserInfo({
        accessToken: authCode.code, // code is the Discord access_token
      });

      if (!userInfo.email) {
        c.header("Cache-Control", "no-store");
        return invalidRequest(
          c,
          "User email is required but not available from Discord",
        );
      }

      const baseUrl = new URL(c.req.url).origin;
      const idToken = await jwt_lib.generateIdToken(
        keyPair.privateKey,
        client_id,
        authCode.subject,
        {
          avatar: userInfo.avatar,
          discriminator: userInfo.discriminator || null,
          email: userInfo.email,
          email_verified: userInfo.verified,
          global_name: userInfo.global_name || null,
          username: userInfo.username,
        },
        baseUrl,
      );

      return c.json(
        {
          access_token: idToken,
          expires_in: 3600,
          id_token: idToken,
          token_type: "Bearer",
        },
        200,
      );
    } catch (error) {
      console.error("Discord service error:", error);
      c.header("Cache-Control", "no-store");
      return serverError(c, "Failed to fetch user information from Discord");
    }
  },
);
