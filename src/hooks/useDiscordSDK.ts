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
    const response = await fetch("/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const responseBody = (await response.json()) as { access_token: string };
    const accessToken = responseBody.access_token as string;

    return accessToken;
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
