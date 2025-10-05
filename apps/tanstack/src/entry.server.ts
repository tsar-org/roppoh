import handler from "@tanstack/react-start/server-entry";
import { dependencyInjection } from "@/utils/di.server";

export default {
  fetch(request, env, ctx) {
    const deps = dependencyInjection({ env });
    return handler.fetch(request, { context: { cf: { ctx, env }, deps } });
  },
} satisfies ExportedHandler<Env>;
