import type { D1Database } from "@cloudflare/workers-types";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { admin, organization } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/d1";
import { schema } from "./schema";

export type BetterAuth = ReturnType<typeof betterAuth>;

// for better-auth cli generate script config
export const auth: BetterAuth = betterAuth({
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
  baseURL: "https://zunpachi.tsar-bmb.org/api/v1/better-auth",
  database: drizzleAdapter({}, { provider: "sqlite", schema: schema }),
  emailAndPassword: {
    enabled: true,
  },
  // experimental: { joins: true },
  plugins: [organization(), admin()],
  secret: "",
  session: {
    // FYI: https://www.better-auth.com/docs/guides/optimizing-for-performance
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
    expiresIn: 604800, // 7 days
    updateAge: 86400, // 1 day
  },
  socialProviders: {
    discord: {
      clientId: "",
      clientSecret: "",
    },
  },
  telemetry: { enabled: true },
  trustedOrigins: [
    "https://zunpachi.tsar-bmb.org",
    "https://ura-roppoh.tsar-bmb.org",
    "https://roppoh.tsar-bmb.org",
  ],
});

export const createBetterAuth = (args: {
  d1: D1Database;
  betterAuthSecret: string;
  discord: {
    clientId: string;
    clientSecret: string;
  };
  isProduction: boolean;
}): BetterAuth =>
  betterAuth({
    advanced: {
      crossSubDomainCookies: {
        domain: args.isProduction ? "zunpachi.tsar-bmb.org" : "localhost",
        enabled: true,
      },
      defaultCookieAttributes: {
        partitioned: true, // New browser standards will mandate this for foreign cookies
        sameSite: "none",
        secure: true,
      },
    },
    basePath: "/api/v1/better-auth",
    baseURL: args.isProduction
      ? "https://zunpachi.tsar-bmb.org"
      : "http://localhost:3002",
    database: drizzleAdapter(drizzle(args.d1), {
      provider: "sqlite",
      schema: schema,
    }),
    emailAndPassword: { enabled: !args.isProduction },
    // experimental: { joins: true },
    plugins: [
      organization(),
      admin({
        adminRoles: ["admin"],
      }),
    ],
    secret: args.betterAuthSecret,
    session: {
      // FYI: https://www.better-auth.com/docs/guides/optimizing-for-performance
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // 5 minutes
      },
      expiresIn: 604800, // 7 days
      updateAge: 86400, // 1 day
    },
    socialProviders: {
      discord: {
        clientId: args.discord.clientId,
        clientSecret: args.discord.clientSecret,
      },
    },
    telemetry: { enabled: true },
    trustedOrigins: args.isProduction
      ? [
          "https://zunpachi.tsar-bmb.org",
          "https://ura-roppoh.tsar-bmb.org",
          "https://roppoh.tsar-bmb.org",
        ]
      : ["http://localhost:*"],
  });
