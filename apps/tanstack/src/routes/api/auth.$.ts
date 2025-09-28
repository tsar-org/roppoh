import { env } from "cloudflare:workers";
import { createFileRoute } from "@tanstack/react-router";
import { createBetterAuthInstance } from "@/libs/better-auth/auth.server";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const auth = createBetterAuthInstance({ env });
        return auth.handler(request);
      },
      POST: ({ request }) => {
        const auth = createBetterAuthInstance({ env });
        return auth.handler(request);
      },
    },
  },
});
