import type { MiddlewareHandler } from "hono";
import type { Bindings, Variables } from "hono/types";
import { Container } from "inversify";
import type { DiscordService } from "../services/discord-service";
import type { KeyPairService } from "../services/keypair-service";
import type { OidcStateCodecService } from "../services/oidc-state-codec-service";

interface ExtendBindings extends Bindings {
  container: Container;
}

interface Env {
  Bindings: Cloudflare.Env & ExtendBindings;
  Variables: Variables;
}

export enum ServiceIdentifier {
  KEY_PAIR_SERVICE = "KeyPairService",
  OIDC_STATE_CODEC_SERVICE = "OidcStateCodecService",
  DISCORD_SERVICE = "DiscordService",
}

const injectDependenciesMiddleware: MiddlewareHandler<Env> = async (
  c,
  next,
) => {
  if (!c.env) c.env = {} as Env["Bindings"];

  const container = new Container();

  container
    .bind<KeyPairService>(ServiceIdentifier.KEY_PAIR_SERVICE)
    .toDynamicValue(async () => {
      const module = await import("../services/keypair-service");
      return new module.KeyPairService();
    });

  container
    .bind<OidcStateCodecService>(ServiceIdentifier.OIDC_STATE_CODEC_SERVICE)
    .toDynamicValue(async () => {
      const module = await import("../services/oidc-state-codec-service");
      return new module.OidcStateCodecService();
    });

  container
    .bind<DiscordService>(ServiceIdentifier.DISCORD_SERVICE)
    .toDynamicValue(async () => {
      const module = await import("../services/discord-service");
      return new module.DiscordService();
    });

  c.env.container = container;

  return next();
};

export { type Env, injectDependenciesMiddleware };
