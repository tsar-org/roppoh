import { createD1Database } from "@roppoh/better-auth-database";
import { betterAuth } from "better-auth";

type BetterAuthInstance = ReturnType<typeof betterAuth>;

export const createBetterAuthInstance = ({
  env,
}: {
  env: Cloudflare.Env;
}): BetterAuthInstance =>
  betterAuth({
    advanced: {
      useSecureCookies: false,
    },
    database: createD1Database(env.ROPPOH_AUTH_DB),
    secret: env.BETTER_AUTH_SECRET,
    session: {
      // FYI: https://www.better-auth.com/docs/guides/optimizing-for-performance
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // 5 minutes
      },
    },
    socialProviders: {
      discord: {
        clientId: env.DISCORD_CLIENT_ID,
        clientSecret: env.DISCORD_CLIENT_SECRET,
      },
    },
    telemetry: {
      enabled: false,
    },
  });
