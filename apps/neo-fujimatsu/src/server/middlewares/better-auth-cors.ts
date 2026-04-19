import type { Context } from "hono";
import { cors } from "hono/cors";

import type { HonoEnv } from "./dependency-injection";

/**
 * @see https://www.better-auth.com/docs/integrations/hono#cors
 */
export const betterAuthCorsMiddleware = cors({
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  credentials: true,
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  origin: (origin, _c: Context<HonoEnv>) => origin,
});
