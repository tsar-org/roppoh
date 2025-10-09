import { API } from "@discordjs/core/http-only";
import type { RESTOptions, ResponseLike } from "@discordjs/rest";
import { REST } from "@discordjs/rest";

const restOption: Partial<RESTOptions> = {
  authPrefix: "Bearer",
  makeRequest: (url, init) =>
    globalThis.fetch(
      url,
      init as globalThis.RequestInit,
    ) as Promise<ResponseLike>,
};

export const createDiscordApiClient = ({ token }: { token: string }) => {
  const rest = new REST(restOption).setToken(token);
  return new API(rest);
};
