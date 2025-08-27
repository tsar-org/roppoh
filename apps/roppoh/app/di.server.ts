import type { Logger } from "pino";
import {
  type BetterAuthInstance,
  createBetterAuthInstance,
} from "./lib/betterAuth/auth.server";
import { createLogger } from "./lib/pino/logger.server";

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
