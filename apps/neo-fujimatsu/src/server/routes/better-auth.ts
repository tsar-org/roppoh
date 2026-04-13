import { Hono } from "hono";

import { type HonoEnv } from "@/server/middlewares/dependency-injection";

/**
 * @see https://www.better-auth.com/docs/integrations/hono#mount-the-handler
 */
export const betterAuthRoute = new Hono<HonoEnv>().all("", async (c) =>
  c.env.betterAuth.handler(c.req.raw),
);
