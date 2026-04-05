import { config, type BetterAuth, schema } from "@roppoh/better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import type { MiddlewareHandler } from "hono";
import type { Bindings, Variables } from "hono/types";
import { Container } from "inversify";

interface ExtendBindings extends Bindings {
  container: Container;
  betterAuth: BetterAuth;
}

interface HonoEnv {
  Bindings: Cloudflare.Env & ExtendBindings;
  Variables: Variables;
}

export enum ServiceIdentifier {
  BETTER_AUTH = "BETTER_AUTH",
}

const injectDependenciesMiddleware: MiddlewareHandler<HonoEnv> = async (c, next) => {
  if (!c.env) c.env = {} as HonoEnv["Bindings"];
  c.env.container = new Container();

  const prd = c.env.NODE_ENV === "production";

  if (!c.env.container.isBound(ServiceIdentifier.BETTER_AUTH))
    c.env.container.bind<BetterAuth>(ServiceIdentifier.BETTER_AUTH).toDynamicValue(async () => {
      const module = await import("@roppoh/better-auth");
      const betterAuth = module.createBetterAuth({
        ...config,
        advanced: {
          ...config.advanced,
          crossSubDomainCookies: {
            domain: prd ? "tsar-bmb.org" : "localhost",
            enabled: true,
          },
        },
        secret: c.env.BETTER_AUTH_SECRET,
        basePath: "/api/auth",
        baseURL: prd ? "https://neo-fujimatsu.tsar-bmb.org" : "http://localhost:3002",
        database: drizzleAdapter(drizzle(c.env.ROPPOH_BETTER_AUTH_DB), {
          provider: "sqlite",
          schema: schema,
        }),
        socialProviders: {
          discord: { clientId: c.env.DISCORD_CLIENT_ID, clientSecret: c.env.DISCORD_CLIENT_SECRET },
        },
        trustedOrigins: prd ? config.trustedOrigins : ["http://localhost:*"],
      });
      return betterAuth;
    });

  return next();
};

export { type HonoEnv, injectDependenciesMiddleware };
