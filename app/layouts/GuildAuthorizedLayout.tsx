import { auth } from "@/lib/betterAuth/auth.server";
import { useIsGuildMember } from "@/lib/swr/discrod";
import { Outlet, data } from "react-router";
import type { Route } from "./+types/GuildAuthorizedLayout";

export async function loader({ request, context }: Route.LoaderArgs) {
  const accessToken = await auth.api.getAccessToken({
    body: { providerId: "discord" },
    headers: request.headers,
  });

  return data(
    {
      accessToken: accessToken.accessToken,
      guild_id: context.cloudflare.env.TSAR_GUILD_ID,
    },
    { headers: { "Cache-Control": "max-age=300" } },
  );
}

/**
 * Guild認可にpassした場合のみ、Outletを表示するLayout
 * - 認可条件
 *  - 指定したGuildに参加していること
 */
export default function GuildAuthorizedLayout({
  loaderData,
}: Route.ComponentProps) {
  const {
    isMember,
    isLoading: isLoadingGuildMember,
    isError,
  } = useIsGuildMember({
    guildId: loaderData.guild_id,
    token: loaderData.accessToken,
  });

  if (isLoadingGuildMember) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error checking guild membership:", isError);
    return <div>Error: {isError.toString()}</div>;
  }

  if (!isMember) {
    return <div>You are not a member of this guild.</div>;
  }

  return <Outlet />;
}
