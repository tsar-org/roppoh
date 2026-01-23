import type { BetterAuth } from "@roppoh/better-auth";
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

const injectDependenciesMiddleware: MiddlewareHandler<HonoEnv> = async (
  c,
  next,
) => {
  if (!c.env) c.env = {} as HonoEnv["Bindings"];
  c.env.container = new Container();

  if (!c.env.container.isBound(ServiceIdentifier.BETTER_AUTH))
    c.env.container
      .bind<BetterAuth>(ServiceIdentifier.BETTER_AUTH)
      .toDynamicValue(async () => {
        const module = await import("@roppoh/better-auth");
        const betterAuth = module.createBetterAuth({
          betterAuthSecret: c.env.BETTER_AUTH_SECRET,
          d1: c.env.ROPPOH_BETTER_AUTH_DB,
          discord: {
            clientId: c.env.DISCORD_CLIENT_ID,
            clientSecret: c.env.DISCORD_CLIENT_SECRET,
          },
          isProduction: c.env.NODE_ENV === "production",
        });
        return betterAuth;
      });

  return next();
};

export { type HonoEnv, injectDependenciesMiddleware };
