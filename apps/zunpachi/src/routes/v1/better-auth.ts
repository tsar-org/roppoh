import type { BetterAuth } from "@roppoh/better-auth";
import { Hono } from "hono";
import {
  type HonoEnv,
  ServiceIdentifier,
} from "@/middlewares/dependency-injection";

export const betterAuthRoute = new Hono<HonoEnv>().on(
  ["POST", "GET"],
  "",
  async (c) => {
    const betterAuth = await c.env.container.getAsync<BetterAuth>(
      ServiceIdentifier.BETTER_AUTH,
    );
    return betterAuth.handler(c.req.raw);
  },
);
