// FYI: https://www.better-auth.com/docs/integrations/remix#create-api-route

import type { Route } from "./+types/dokploy";

export const loader = ({ request, context }: Route.LoaderArgs) =>
  requestProxy({ env: context.cf.env, request });

export const action = ({ request, context }: Route.ActionArgs) =>
  requestProxy({ env: context.cf.env, request });

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
async function requestProxy({
  request,
  env,
}: {
  request: Request;
  env: Cloudflare.Env;
}) {
  // convert request url
  const url = new URL(request.url);
  const apiUrl = new URL(env.DOKPLOY_API_URL);
  const apiPath = url.pathname.replace(/^\/api\/dokploy\//, "/api/");
  const proxyUrl = new URL(apiPath + url.search, apiUrl);

  // add header
  const headers = new Headers(request.headers);
  headers.set("x-api-key", `${env.DOKPLOY_API_TOKEN}`);
  headers.set("CF-Access-Client-Id", env.CF_ACCESS_CLIENT_ID);
  headers.set("CF-Access-Client-Secret", env.CF_ACCESS_CLIENT_SECRET);
  headers.set("Accept", "application/json");

  // send request
  return fetch(proxyUrl, {
    body: request.body,
    headers: headers,
    method: request.method,
  });
}
