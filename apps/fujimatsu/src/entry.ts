import "reflect-metadata";
import { AuthorizationCodeStore } from "./durable-objects/authorization-code-store";
import { app } from "./server";

// durable-objects
export { AuthorizationCodeStore };

export default {
  fetch: app.fetch,
  scheduled: async (_batch, env, _ctx) => {
    const id = env.AUTH_CODE_STORE.idFromName("default");
    const store = env.AUTH_CODE_STORE.get(id);
    await store.deleteAll();
    return;
  },
} satisfies ExportedHandler<Cloudflare.Env>;
