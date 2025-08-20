import { API } from "@discordjs/core/http-only";
import { REST } from "@discordjs/rest";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { authClient } from "../betterAuth/auth.client";

const createDiscordApiClient = ({ token }: { token: string }) => {
  const rest = new REST({ authPrefix: "Bearer" }).setToken(token);
  return new API(rest);
};

export const useDiscordUser = () => {
  const fetcher = async () => {
    const accessToken = await authClient.getAccessToken({
      providerId: "discord",
    });
    if (accessToken.error) {
      throw new Error("Failed to fetch Discord access token");
    }

    const client = createDiscordApiClient({
      token: accessToken.data.accessToken,
    });
    const info = await client.oauth2.getCurrentAuthorizationInformation();

    if (!info.user) {
      throw new Error("Failed to fetch Discord user information");
    }

    return info.user;
  };

  const { data, isLoading, error } = useSWR(["/oauth2/@me"], () => fetcher());

  return { user: data, isLoading, isError: error };
};

export const useIsGuildMember = ({ guildId, token }: { guildId: string; token: string }) => {
  const fetcher = async ({
    _url,
    guildId,
    token,
  }: {
    _url: string;
    guildId: string;
    token: string;
  }) => {
    const client = createDiscordApiClient({ token });
    const guilds = await client.users.getGuilds();

    return guilds.some((guild) => guild.id === guildId);
  };

  const { data, isLoading, error } = useSWRImmutable(
    ["/oauth2/@me/guilds", guildId, token],
    ([url, guildId, token]) => fetcher({ _url: url, guildId, token }),
  );

  return { isMember: data, isLoading, isError: error };
};
