// import { QueryClient } from "@tanstack/react-query";
import type { Logger } from "pino";
import {
  type BetterAuthInstance,
  createBetterAuthInstance,
} from "@/libs/better-auth/auth.server";
import { createLogger } from "@/libs/pino/logger.server";

export type DependencyContainer = {
  logger: Logger;
  betterAuth: BetterAuthInstance;
  // queryClient: QueryClient;
};

export const dependencyInjection = ({
  env,
}: {
  env: Cloudflare.Env;
}): DependencyContainer => {
  const betterAuth = createBetterAuthInstance({ env });

  const logger = createLogger();

  // const queryClient = new QueryClient()

  return {
    betterAuth,
    logger,
    // queryClient
  };
};
