import type { MiddlewareHandler } from "hono";
import type { Bindings, Variables } from "hono/types";
import { DiscordService } from "../services/discord-service";
import { KeyPairService } from "../services/keypair-service";
import { OidcStateCodecService } from "../services/oidc-state-codec-service";

interface ExtendBindings extends Bindings {
  keyPairService: KeyPairService;
  oidcStateCodecService: OidcStateCodecService;
  discordService: DiscordService;
}

interface Env {
  Bindings: Cloudflare.Env & ExtendBindings;
  Variables: Variables;
}

const injectDependenciesMiddleware: MiddlewareHandler<Env> = async (
  c,
  next,
) => {
  if (!c.env.keyPairService) c.env.keyPairService = new KeyPairService();

  if (!c.env.oidcStateCodecService)
    c.env.oidcStateCodecService = new OidcStateCodecService();

  if (!c.env.discordService) c.env.discordService = new DiscordService();

  return next();
};

export { type Env, injectDependenciesMiddleware };
