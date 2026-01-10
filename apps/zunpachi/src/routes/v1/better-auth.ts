import type { BetterAuth } from "@roppoh/better-auth";
import { Hono } from "hono";
import {
  type HonoEnv,
  ServiceIdentifier,
} from "@/middlewares/dependency-injection";

/**
 * @see https://www.better-auth.com/docs/integrations/hono#mount-the-handler
 */
export const betterAuthRoute = new Hono<HonoEnv>().all("", async (c) => {
  const betterAuth = await c.env.container.getAsync<BetterAuth>(
    ServiceIdentifier.BETTER_AUTH,
  );
  return betterAuth.handler(c.req.raw);
});
