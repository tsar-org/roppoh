import { createFileRoute } from "@tanstack/react-router";
import { provideContextMiddleware } from "@/middlewares/provide-context-middleware";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request, context }) =>
        context.deps.betterAuth.handler(request),
      POST: async ({ request, context }) =>
        context.deps.betterAuth.handler(request),
    },
    middleware: [provideContextMiddleware],
  },
});
