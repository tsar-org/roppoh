import { Hono } from "hono";

export const discoveryRoute = new Hono<{ Bindings: Cloudflare.Env }>().get(
  "",
  (c) => {
    const baseUrl = new URL(c.req.url).origin;
    const issuer = baseUrl;

    return c.json({
      authorization_endpoint: `${baseUrl}/authorize`,
      claims_supported: [
        "sub",
        "name",
        "email",
        "email_verified",
        "guilds",
        "preferred_username",
      ],
      grant_types_supported: ["authorization_code"],
      id_token_signing_alg_values_supported: ["RS256"],
      issuer,
      jwks_uri: `${baseUrl}/jwks.json`,
      response_types_supported: ["code"],
      scopes_supported: ["openid", "profile", "email"],
      subject_types_supported: ["public"],
      token_endpoint: `${baseUrl}/token`,
      userinfo_endpoint: `${baseUrl}/userinfo`,
    });
  },
);
