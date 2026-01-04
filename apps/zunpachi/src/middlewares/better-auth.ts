import type { Context } from "hono";
import { cors } from "hono/cors";
import type { HonoEnv } from "./dependency-injection";

export const betterAuthCorsMiddleware = cors({
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  credentials: true,
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  origin: async (_, c: Context<HonoEnv>) => {
    if (c.env.NODE_ENV !== "production") {
      return "*";
    }

    return c.env.CORS_DOMAIN;
  },
});
