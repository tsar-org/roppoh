import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { oauthProvider } from "@better-auth/oauth-provider";
import { betterAuth, type BetterAuthOptions } from "better-auth/minimal";
import { jwt, admin } from "better-auth/plugins";
import type { Auth } from "better-auth/types";

import * as schema from "./auth-schema";

export const config = {
  advanced: {
    crossSubDomainCookies: {
      domain: "zunpachi.tsar-bmb.org",
      enabled: true,
    },
    defaultCookieAttributes: {
      partitioned: true, // New browser standards will mandate this for foreign cookies
      sameSite: "none",
      secure: true,
    },
  },
  // baseURL: "https://zunpachi.tsar-bmb.org/api/v1/better-auth",
  basePath: "",
  baseURL: "https://zunpachi.tsar-bmb.org",
  database: drizzleAdapter({}, { provider: "sqlite", schema: schema }) as any,
  disabledPaths: ["/token"],
  plugins: [
    admin(),
    jwt(),
    oauthProvider({
      loginPage: "/sign-in",
      consentPage: "/consent",
    }),
  ] as const,
  secret: "",
  session: {
    storeSessionInDatabase: true, // for oidc
    // FYI: https://www.better-auth.com/docs/guides/optimizing-for-performance
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
    expiresIn: 604800, // 7 days
    updateAge: 86400, // 1 day
  },
  socialProviders: {
    discord: { clientId: "DISCORD_CLIENT_ID", clientSecret: "DISCORD_CLIENT_SECRET" },
  },
  telemetry: { enabled: true },
  trustedOrigins: [
    "https://zunpachi.tsar-bmb.org",
    "https://ura-roppoh.tsar-bmb.org",
    "https://roppoh.tsar-bmb.org",
  ],
} satisfies BetterAuthOptions;

// for better-auth cli generate script config
export const auth: Auth<typeof config> = betterAuth(config);

export const createBetterAuth = <T extends typeof config>(override: T): Auth<T> =>
  betterAuth({ ...config, ...override });

export type BetterAuth = ReturnType<typeof createBetterAuth>;
