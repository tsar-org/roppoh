import { data, Outlet } from "react-router";
import { createDiscordApiClient } from "@/lib/discordjs/client.server";
import type { Route } from "./+types/layout";

export async function loader({ request: req, context: ctx }: Route.LoaderArgs) {
  try {
    // get discord access token
    const accessToken = await ctx.dep.betterAuth.api.getAccessToken({
      body: { providerId: "discord" },
      headers: req.headers,
    });

    // get user guilds
    const client = createDiscordApiClient({ token: accessToken.accessToken });
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
