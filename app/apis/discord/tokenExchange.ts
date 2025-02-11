import { clientSideEnv } from "@/lib/clientSideEnv";
import { tokenCookie } from "@/lib/cookie";
import {
  API,
  type RESTPostOAuth2AccessTokenResult,
} from "@discordjs/core/http-only";
import { REST } from "@discordjs/rest";
import { useEffect } from "react";
import { data, redirect, useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/tokenExchange";

export async function loader({ request, context }: Route.LoaderArgs) {
  const { env } = context.cloudflare;
  const url = new URL(request.url);
  const queryParams = new URLSearchParams(url.search);
  const code = queryParams.get("code");

  if (!code) {
    return redirect("/login");
  }

  // setup discord api client
  const rest = new REST({ authPrefix: "Bearer" });
  const api = new API(rest);

  // token exchange from code
  let token: RESTPostOAuth2AccessTokenResult | undefined = undefined;
  try {
    token = await api.oauth2.tokenExchange({
      client_id: clientSideEnv.DISCORD_ID,
      client_secret: env.DISCORD_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: clientSideEnv.DISCORD_REDIRECT_URL,
    });
  } catch (error) {
    return redirect("/login");
  }

  // return token;
  return data(
    { token: token },
    {
      headers: {
        "Set-Cookie": await tokenCookie.serialize(token),
      },
    },
  );
}

export default function TokenExchange() {
  const _data = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);
}
