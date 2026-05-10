import { oauthProviderAuthServerMetadata } from "@better-auth/oauth-provider";
import { Hono } from "hono";

import type { HonoEnv } from "../../middlewares/dependency-injection";

/**
 * @see https://www.better-auth.com/docs/integrations/hono#mount-the-handler
 */
export const oauthAuthorizationServerRoute = new Hono<HonoEnv>().get("", async (c) =>
  oauthProviderAuthServerMetadata(c.env.betterAuth)(c.req.raw),
);
