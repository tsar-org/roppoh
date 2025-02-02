import { apiClient } from "@/lib/apiClient";
import { DiscordSDK } from "@discord/embedded-app-sdk";

interface useDiscordSDKInterface {
  setupDiscordSDK: () => void;
}

export function useDiscordSDK(discordClientId: string): useDiscordSDKInterface {
  const fetchAuthorizationCode = async (discordSdk: DiscordSDK) => {
    const { code } = await discordSdk.commands.authorize({
      client_id: discordClientId,
      response_type: "code",
      state: "",
      prompt: "none",
      scope: [],
    });

    return code;
  };

  const fetchAccessToken = async (code: string) => {
    const response = await apiClient.api.token.$post({
      json: { code },
    });

    if (response.status !== 200) {
      console.error("Failed to fetch access token", response);
      throw new Error("Failed to fetch access token");
    }

    const body = await response.json();

    return body.access_token;
  };

  const setupDiscordSDK = async () => {
    const discordSdk = new DiscordSDK(discordClientId);

    await discordSdk.ready();

    const code = await fetchAuthorizationCode(discordSdk);
    const accessToken = await fetchAccessToken(code);

    const auth = await discordSdk.commands.authenticate({
      access_token: accessToken,
    });

    if (!auth) {
      console.error("Failed to authenticate with Discord SDK");
      return;
    }
  };

  return {
    setupDiscordSDK,
  };
}
