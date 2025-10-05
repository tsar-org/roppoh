import { createFileRoute } from "@tanstack/react-router";
import { provideContextMiddleware } from "@/middlewares/provide-context-middleware";

// requestをproxyする
const coolifyRequestProxy = async ({
  request,
  env,
}: {
  request: Request;
  env: Cloudflare.Env;
}) => {
  // requestのURLを置換
  const url = new URL(request.url);
  const coolifyApiUrl = new URL(env.COOLIFY_API_URL);
  // const coolifyApiUrl = new URL("http://192.168.123.123:8000");
  // /api/coolify/ を取り除いてCoolify APIのパスを構築
  const apiPath = url.pathname.replace(/^\/api\/coolify\//, "/api/v1/");
  const proxyUrl = new URL(apiPath + url.search, coolifyApiUrl);
  console.log("proxyUrl", proxyUrl.toString());

  // headerを付与
  const headers = new Headers(request.headers);
  headers.set("Authorization", `Bearer ${env.COOLIFY_API_TOKEN}`);
  headers.set("CF-Access-Client-Id", env.COOLIFY_CF_ACCESS_CLIENT_ID);
  headers.set("CF-Access-Client-Secret", env.COOLIFY_CF_ACCESS_CLIENT_SECRET);
  headers.set("Accept", "application/json");

  // リクエストを送信
  const proxyRequest = new Request(proxyUrl.toString(), {
    body: request.body,
    headers,
    method: request.method,
  });

  const response = await fetch(proxyRequest);
  console.error("response", response);

  // responseをreturn
  return new Response(response.body, {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
  });
};

export const Route = createFileRoute("/api/coolify/$")({
  server: {
    handlers: {
      GET: ({ request, context }) =>
        coolifyRequestProxy({ env: context.cf.env, request }),
    },
    middleware: [provideContextMiddleware],
  },
});
