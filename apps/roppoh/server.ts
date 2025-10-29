import { createRequestHandler } from "react-router";
import {
  type DependencyContainer,
  dependencyInjection,
} from "@/utils/dependency-injection.server";

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
    return requestHandler(request, { cf: { ctx, env }, dep });
  },
} satisfies ExportedHandler<Env>;
