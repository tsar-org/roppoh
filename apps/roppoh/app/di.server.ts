import type { QueryClient } from "@tanstack/react-query";
import type { Dokploy } from "dokploy-sdk";
import type { Logger } from "pino";
import {
  type BetterAuthInstance,
  createBetterAuthInstance,
} from "@/libs/better-auth/auth.server";
import { newDokployClient } from "@/libs/dokploy-sdk/dokploy";
import { createLogger } from "@/libs/pino/logger.server";
import { newServerSideReactQueryClient } from "@/libs/react-query/client.server";

export type DependencyContainer = {
  logger: Logger;
  betterAuth: BetterAuthInstance;
  tanstackQueryClient: QueryClient;
  dokployClient: Dokploy;
};

export const dependencyInjection = ({
  env,
}: {
  env: Cloudflare.Env;
}): DependencyContainer => {
  return {
    betterAuth: createBetterAuthInstance({ env }),
    dokployClient: newDokployClient(),
    logger: createLogger(),
    tanstackQueryClient: newServerSideReactQueryClient(),
  };
};
