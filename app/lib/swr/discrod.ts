import { API } from "@discordjs/core/http-only";
import { REST } from "@discordjs/rest";
import useSWR from "swr";

const discordApiClient = (token: string) => {
  const rest = new REST({ authPrefix: "Bearer" }).setToken(token);
  return new API(rest);
};

export const useDiscordUser = (token: string) => {
  const fetcher = async (_url: string, token: string) => {
    const client = discordApiClient(token);
    const user = await client.oauth2.getCurrentAuthorizationInformation();
    console.log("user", user);
    return user;
  };

  const { data, isLoading, error } = useSWR(
    ["/oauth2/@me", token],
    ([url, token]) => fetcher(url, token),
  );

  return { user: data, isLoading, isError: error };
};

export const useIsGuildMember = (guildId: string, token: string) => {
  const fetcher = async (_url: string, token: string, guildId: string) => {
    const client = discordApiClient(token);
    const guilds = await client.users.getGuilds();
    console.log("guilds", guilds);

    return guilds.some((guild) => guild.id === guildId);
  };

  const { data, isLoading, error } = useSWR(
    ["/oauth2/@me/guilds", guildId, token],
    ([url, guildId, token]) => fetcher(url, guildId, token),
  );

  return { isMember: data, isLoading, isError: error };
};
