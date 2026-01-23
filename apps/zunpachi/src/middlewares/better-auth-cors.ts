import type { Context } from "hono";
import { cors } from "hono/cors";
import type { HonoEnv } from "./dependency-injection";

const ALLOW_DOMAINS = {
  URA_ROPPOH: "https://ura-roppoh.tsar-bmb.org",
} as const;

/**
 * @see https://www.better-auth.com/docs/integrations/hono#cors
 */
export const betterAuthCorsMiddleware = cors({
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  credentials: true,
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  origin: (origin, c: Context<HonoEnv>) => {
    if (c.env.NODE_ENV !== "production") return origin;

    switch (origin) {
      case ALLOW_DOMAINS.URA_ROPPOH:
        return ALLOW_DOMAINS.URA_ROPPOH;
      default:
        return c.env.CORS_DOMAIN;
    }
  },
});
