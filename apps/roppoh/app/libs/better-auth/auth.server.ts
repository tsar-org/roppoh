import { createD1Database } from "@roppoh/better-auth-database";
import { betterAuth } from "better-auth";

export type BetterAuthInstance = ReturnType<typeof betterAuth>;

/**
 * CloudFlare Workers環境では、global scopeで環境変数を参照できないため、envを引数として受け取る
 */
export const createBetterAuthInstance = ({
  env,
}: {
  env: Cloudflare.Env;
}): BetterAuthInstance => {
  return betterAuth({
    advanced: {
      ipAddress: {
        ipAddressHeaders: ["cf-connecting-ip", "x-real-ip"],
      },
      // crossSubDomainCookies: {
      //   domain: "tsar-bmb.org",
      //   enabled: true,
      // },
      useSecureCookies: false,
    },
    // baseURL: env.BETTER_AUTH_URL,
    database: createD1Database(env.ROPPOH_AUTH_DB),
    // trustedOrigins: [
    //   "http://localhost",
    //   "https://roppoh.tsar-bmb.org",
    //   "https://roppoh.stg.tsar-bmb.org",
    // ],
    rateLimit: {
      enabled: true,
    },
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
};
