import { Hono } from "hono";

import { type HonoEnv } from "../../middlewares/dependency-injection";

/**
 * @see https://www.better-auth.com/docs/integrations/hono#mount-the-handler
 */
export const openidConfigurationRoute = new Hono<HonoEnv>().get("", async (c) => {
  const config = await c.env.betterAuth.api.getOpenIdConfig();

  return c.json(config, 200);
});
