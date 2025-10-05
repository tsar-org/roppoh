import { getRouter } from "@/router";
import type { DependencyContainer } from "@/utils/di.server";

declare module "@tanstack/react-start" {
  interface Register {
    router: ReturnType<typeof getRouter>;
    server: {
      requestContext: {
        cf: {
          env: Env;
          ctx: ExecutionContext;
        };
        deps: DependencyContainer;
      };
    };
  }
}
