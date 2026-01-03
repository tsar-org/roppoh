import type { D1Database } from "@cloudflare/workers-types";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { admin, organization } from "better-auth/plugins";
import { drizzle } from "drizzle-orm/d1";

export type BetterAuth = ReturnType<typeof betterAuth>;

// for better-auth cli generate script config
export const auth: BetterAuth = betterAuth({
  database: drizzleAdapter({}, { provider: "sqlite" }),
  experimental: { joins: true },
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
  telemetry: { enabled: false },
});

export const createBetterAuth = (args: {
  d1: D1Database;
  betterAuthSecret: string;
  discord: {
    clientId: string;
    clientSecret: string;
  };
}): BetterAuth =>
  betterAuth({
    database: drizzleAdapter(drizzle(args.d1), { provider: "sqlite" }),
    experimental: { joins: true },
    plugins: [organization(), admin()],
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
    telemetry: { enabled: false },
  });
