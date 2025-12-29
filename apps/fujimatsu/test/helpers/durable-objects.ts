import type { Miniflare } from "miniflare";
import type { AuthorizationCodeStore } from "@/durable-objects/authorization-code-store";

export async function getDefaultDurableObjectsFromMiniflare(
  miniflare: Miniflare,
) {
  const ns = (await miniflare.getDurableObjectNamespace(
    "AUTH_CODE_STORE",
  )) as unknown as DurableObjectNamespace<AuthorizationCodeStore>;
  const id = ns.newUniqueId();
  const object = ns.get(id);
  return object;
}
