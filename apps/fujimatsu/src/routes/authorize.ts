import { Hono } from "hono";
import * as v from "valibot";
import type { Env } from "../middlewares/dependency-injection";
import { invalidClient } from "../utils/error-response";
import { oidcValidator } from "../utils/oidc-validator";

const authorizeQuerySchema = v.object({
  client_id: v.pipe(v.string(), v.minLength(1)),
  redirect_uri: v.pipe(v.string(), v.url()),
  response_type: v.string(),
  scope: v.optional(v.string(), "openid email"),
  state: v.optional(v.string()),
});

export const authorizeRoute = new Hono<Env>().get(
  "",
  oidcValidator("query", authorizeQuerySchema),
  async (c) => {
    const { client_id, redirect_uri, response_type, scope, state } =
      c.req.valid("query");

    if (client_id !== c.env.DISCORD_CLIENT_ID) {
      return invalidClient(c, "Invalid client_id");
    }

    if (response_type !== "code") {
      const errorUrl = new URL(redirect_uri);
      errorUrl.searchParams.set("error", "unsupported_response_type");
      errorUrl.searchParams.set(
        "error_description",
        "Only code flow is supported",
      );
      if (state) errorUrl.searchParams.set("state", state);
      return c.redirect(errorUrl.toString());
    }

    const discordState = c.env.oidcStateCodecService.encode({
      clientId: client_id,
      redirectUri: redirect_uri,
      scope: scope,
      state: state,
    });

    if (!discordState) {
      const errorUrl = new URL(redirect_uri);
      errorUrl.searchParams.set("error", "server_error");
      errorUrl.searchParams.set(
        "error_description",
        "Failed to encode state parameter",
      );
      if (state) errorUrl.searchParams.set("state", state);
      return c.redirect(errorUrl.toString());
    }

    const redirectUrl = await c.env.discordService.generateAuthorizationURL({
      client_id: c.env.DISCORD_CLIENT_ID,
      redirect_uri: c.env.DISCORD_REDIRECT_URL,
      response_type: "code",
      scope: scope,
      state: discordState,
    });

    return c.redirect(redirectUrl);
  },
);
