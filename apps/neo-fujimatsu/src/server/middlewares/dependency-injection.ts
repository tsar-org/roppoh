import type { BetterAuth } from "@roppoh/better-auth";
import { config, createBetterAuth, schema } from "@roppoh/better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import type { MiddlewareHandler } from "hono";
import type { Bindings, Variables } from "hono/types";

interface ExtendBindings extends Bindings {
  betterAuth: BetterAuth;
}

export interface HonoEnv {
  Bindings: Cloudflare.Env & ExtendBindings;
  Variables: Variables;
}

export const injectDependenciesMiddleware: MiddlewareHandler<HonoEnv> = async (c, next) => {
  if (!c.env) c.env = {} as HonoEnv["Bindings"];

  const prd = c.env.NODE_ENV === "production";

  c.env.betterAuth = createBetterAuth({
    ...config,
    secret: c.env.BETTER_AUTH_SECRET,
    basePath: "/api",
    baseURL: prd ? "https://neo-fujimatsu.tsar-bmb.org" : "http://localhost:3002",
    database: drizzleAdapter(drizzle(c.env.ROPPOH_BETTER_AUTH_DB), {
      provider: "sqlite",
      schema: schema,
    }),
    socialProviders: {
      discord: { clientId: c.env.DISCORD_CLIENT_ID, clientSecret: c.env.DISCORD_CLIENT_SECRET },
    },
  });

  return next();
};
