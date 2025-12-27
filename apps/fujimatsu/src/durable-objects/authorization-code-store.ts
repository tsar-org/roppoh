import { DurableObject } from "cloudflare:workers";

export interface AuthorizationCode {
  clientId: string;
  code: string; // authorization code
  createdAt: number;
  expiresAt: number;
  redirectUri: string;
  scope: string;
  consume: boolean;
  subject: string; // user id
}

export class AuthorizationCodeStore extends DurableObject<Cloudflare.Env> {
  // biome-ignore lint/complexity/noUselessConstructor: fuck
  constructor(ctx: DurableObjectState, env: Cloudflare.Env) {
    super(ctx, env);
  }

  public async issue(args: Omit<AuthorizationCode, "createdAt" | "consume">) {
    const authCode: AuthorizationCode = {
      clientId: args.clientId,
      code: args.code,
      consume: false,
      createdAt: Date.now(), // Current timestamp
      expiresAt: args.expiresAt, // Absolute expiration timestamp
      redirectUri: args.redirectUri,
      scope: args.scope,
      subject: args.subject,
    };

    return await this.ctx.storage.put<AuthorizationCode>(args.code, authCode);
  }

  public async consume(
    args: Pick<AuthorizationCode, "code" | "clientId" | "redirectUri">,
  ) {
    const authCode = await this.ctx.storage.get<AuthorizationCode>(args.code);
    if (!authCode) return null;

    // auth code validation
    if (authCode.expiresAt < Date.now()) return null;
    if (authCode.consume) return null;
    if (authCode.clientId !== args.clientId) return null;
    if (authCode.redirectUri !== args.redirectUri) return null;

    // update auth code
    const consumedAuthCode = { ...authCode, consume: true };
    await this.ctx.storage.put<AuthorizationCode>(args.code, consumedAuthCode);

    return consumedAuthCode;
  }

  public async deleteExpired() {
    const now = Date.now();
    const codes = await this.ctx.storage.list<AuthorizationCode>();

    const keysToDelete = Array.from(codes.entries())
      .filter(([, authCode]) => authCode.expiresAt < now)
      .map(([key]) => key);

    if (keysToDelete.length === 0) return;

    await this.ctx.storage.delete(keysToDelete);
  }

  public async deleteAll() {
    return await this.ctx.storage.deleteAll();
  }
}
