import type { DependencyContainer } from "@/utils/di.server";

declare module "@tanstack/react-start" {
  interface Register {
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
