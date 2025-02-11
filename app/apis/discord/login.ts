import { clientSideEnv } from "@/lib/clientSideEnv";
import { redirect } from "react-router";
import type { Route } from "./+types/login";

export async function action({ context }: Route.ActionArgs) {
  const { env } = context.cloudflare;
  const encodedRedirectUrl = encodeURIComponent(env.DISCORD_REDIRECT_URL);

  const authorizationURL = `${clientSideEnv.DISCORD_OAUTH_BASE_URL}/authorize?client_id=${clientSideEnv.DISCORD_ID}&redirect_uri=${encodedRedirectUrl}&response_type=code&scope=identify+guilds+email`;

  return redirect(authorizationURL);
}
