// FYI: https://www.better-auth.com/docs/integrations/remix#create-api-route

import type { Route } from "./+types/dokploy";

export const loader = async ({ request, context }: Route.LoaderArgs) =>
  fetch(requestProxy({ env: context.cf.env, request }));

export const action = async ({ request, context }: Route.ActionArgs) =>
  fetch(requestProxy({ env: context.cf.env, request }));

type DokployEnv = Pick<
  Cloudflare.Env,
  | "DOKPLOY_API_URL"
  | "DOKPLOY_API_TOKEN"
  | "CF_ACCESS_CLIENT_ID"
  | "CF_ACCESS_CLIENT_SECRET"
>;

/**
 * Proxies requests to the Dokploy API
 *
 * - Converts `/api/dokploy/` path to `/api/`
 * - Adds authentication headers (Bearer token)
 * - Adds Cloudflare Access headers
 * - Forwards the request to the Dokploy API
 * - Returns the response from Dokploy API
 *
 * @returns Response from the Dokploy API
 */
export function requestProxy({
  request,
  env,
}: {
  request: Request;
  env: DokployEnv;
}) {
  const url = new URL(request.url);
  const apiPath = url.pathname.replace(/^\/api\/dokploy\//, "/api/");
  const proxyUrl = new URL(apiPath + url.search, env.DOKPLOY_API_URL);

  // add header
  const headers = new Headers(request.headers);
  headers.set("x-api-key", `${env.DOKPLOY_API_TOKEN}`);
  headers.set("CF-Access-Client-Id", env.CF_ACCESS_CLIENT_ID);
  headers.set("CF-Access-Client-Secret", env.CF_ACCESS_CLIENT_SECRET);
  headers.set("Accept", "application/json");

  const requestOptions: RequestInit = {
    body: request.body,
    headers: headers,
    method: request.method,
  };

  // Add duplex for streaming bodies
  if (request.body) {
    Object.assign(requestOptions, { duplex: "half" });
  }

  return new Request(proxyUrl, requestOptions);
}
