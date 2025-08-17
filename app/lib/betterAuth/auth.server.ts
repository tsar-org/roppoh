import { env } from "cloudflare:workers";
import { schemas } from "@/database/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";

export const auth = betterAuth({
  database: drizzleAdapter(drizzle(env.ROPPOH_AUTH_DB), {
    provider: "sqlite",
    schema: { ...schemas },
  }),
  secret: process.env.BETTER_AUTH_SECRET,
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
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    },
  },
  telemetry: {
    enabled: false,
  },
});
