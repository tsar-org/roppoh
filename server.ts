import { type DependencyContainer, dependencyInjection } from "@/di.server";
import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cf: {
      env: Env;
      ctx: ExecutionContext;
    };
    dep: DependencyContainer;
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    const dep = dependencyInjection({ env });
    return requestHandler(request, { cf: { env, ctx }, dep });
  },
} satisfies ExportedHandler<Env>;
