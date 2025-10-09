import type { Logger } from "pino";
import {
  type BetterAuthInstance,
  createBetterAuthInstance,
} from "./libs/betterAuth/auth.server";
import { createLogger } from "./libs/pino/logger.server";

export type DependencyContainer = {
  logger: Logger;
  betterAuth: BetterAuthInstance;
};

export const dependencyInjection = ({
  env,
}: {
  env: Cloudflare.Env;
}): DependencyContainer => {
  const betterAuth = createBetterAuthInstance({ env });

  const logger = createLogger();

  return {
    betterAuth,
    logger,
  };
};
