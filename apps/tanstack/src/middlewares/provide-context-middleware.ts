import { env } from "cloudflare:workers";
import { createMiddleware } from "@tanstack/react-start";
import { dependencyInjection } from "@/utils/di.server";

export const provideContextMiddleware = createMiddleware().server(
  async ({ next }) => {
    const container = dependencyInjection({ env });
    return next({ context: { cf: { ctx: {}, env }, deps: container } });
  },
);
