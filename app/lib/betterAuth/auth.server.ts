import { schemas } from "@/database/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";

export type BetterAuthInstance = ReturnType<typeof betterAuth>;

/**
 * CloudFlare Workers環境では、global scopeで環境変数を参照できないため、envを引数として受け取る
 */
export const createBetterAuthInstance = ({
  env,
}: { env: Cloudflare.Env }): BetterAuthInstance => {
  return betterAuth({
    database: drizzleAdapter(drizzle(env.ROPPOH_AUTH_DB), {
      provider: "sqlite",
      schema: { ...schemas },
    }),
    secret: env.BETTER_AUTH_SECRET,
    advanced: {
      useSecureCookies: false,
    },
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
};
