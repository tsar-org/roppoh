import { API } from "@discordjs/core/http-only";
import { REST } from "@discordjs/rest";
import type { RESTOptions, ResponseLike } from "@discordjs/rest";
import type { RequestInit } from "undici";

const restOption: Partial<RESTOptions> = {
  authPrefix: "Bearer",
  makeRequest: (url: string, init: RequestInit) => {
    return globalThis.fetch(
      url,
      init as globalThis.RequestInit,
    ) as Promise<ResponseLike>;
  },
};

export const createDiscordApiClient = ({ token }: { token: string }) => {
  const rest = new REST(restOption).setToken(token);
  return new API(rest);
};
