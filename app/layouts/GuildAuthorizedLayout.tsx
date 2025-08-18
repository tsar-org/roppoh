import { API } from "@discordjs/core/http-only";
import { REST } from "@discordjs/rest";
import type { ResponseLike } from "@discordjs/rest";
import { Outlet, data } from "react-router";
import type { RequestInit } from "undici";
import type { Route } from "./+types/GuildAuthorizedLayout";

export async function loader({ request: req, context: ctx }: Route.LoaderArgs) {
  try {
    // get discord access token
    const accessToken = await ctx.dep.betterAuth.api.getAccessToken({
      body: { providerId: "discord" },
      headers: req.headers,
    });

    // get user guilds
    const rest = new REST({
      authPrefix: "Bearer",
      makeRequest: (url: string, init: RequestInit) =>
        globalThis.fetch(
          url,
          init as globalThis.RequestInit,
        ) as Promise<ResponseLike>,
    }).setToken(accessToken.accessToken);

    const client = new API(rest);
    const guilds = await client.users.getGuilds();

    // check if user is in the specified guild
    const isMember = guilds.some(
      (guild) => guild.id === ctx.cf.env.TSAR_GUILD_ID,
    );

    return data(
      { isMember: isMember },
      { headers: { "Cache-Control": "max-age=300" } }, // Cache for 5 minutes
    );
  } catch (error) {
    ctx.dep.logger.error(error, "Failed to get access token");
    throw error;
  }
}

/**
 * Guild認可にpassした場合のみ、Outletを表示するLayout
 * - 認可条件
 *  - 指定したGuildに参加していること
 */
export default function GuildAuthorizedLayout({
  loaderData,
}: Route.ComponentProps) {
  if (!loaderData.isMember) {
    return <div>You are not a member of this guild.</div>;
  }

  return <Outlet />;
}
