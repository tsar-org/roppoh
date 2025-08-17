import { API } from "@discordjs/core/http-only";
import { REST } from "@discordjs/rest";

export const createDiscordCClient = ({ token }: { token: string }): API => {
  const rest = new REST({ authPrefix: "Bearer" }).setToken(token);
  return new API(rest);
};
