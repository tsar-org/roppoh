import {
  type APIUser,
  OAuth2API,
  type RESTGetAPICurrentUserGuildsResult,
  type RESTPostOAuth2AccessTokenResult,
  UsersAPI,
} from "@discordjs/core/http-only";
import type { RESTOptions, ResponseLike } from "@discordjs/rest";
import { REST } from "@discordjs/rest";

export class DiscordService {
  private readonly restOption: Partial<RESTOptions> = {
    authPrefix: "Bearer",
    makeRequest: (url, init) =>
      globalThis.fetch(
        url,
        init as globalThis.RequestInit,
      ) as Promise<ResponseLike>,
  };

  public async generateAuthorizationURL(
    args: Parameters<OAuth2API["generateAuthorizationURL"]>[0],
  ) {
    const rest = new REST(this.restOption);
    const oauth = new OAuth2API(rest);

    return await oauth.generateAuthorizationURL(args);
  }

  public async exchangeCodeForToken(
    args: Parameters<OAuth2API["tokenExchange"]>[0],
  ): Promise<RESTPostOAuth2AccessTokenResult> {
    const rest = new REST(this.restOption);
    const oauth = new OAuth2API(rest);

    return await oauth.tokenExchange(args);
  }

  public async getUserInfo({
    accessToken,
  }: {
    accessToken: string;
  }): Promise<APIUser> {
    const rest = new REST(this.restOption).setToken(accessToken);
    const users = new UsersAPI(rest);

    return await users.getCurrent();
  }

  public async getUserGuilds(): Promise<RESTGetAPICurrentUserGuildsResult> {
    const rest = new REST(this.restOption);
    const users = new UsersAPI(rest);

    return await users.getGuilds();
  }
}
