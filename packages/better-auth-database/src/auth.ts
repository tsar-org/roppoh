import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, organization } from "better-auth/plugins";
import Database from "better-sqlite3";

type BetterAuth = ReturnType<typeof betterAuth>;

export const auth: BetterAuth = betterAuth({
  database: drizzleAdapter(new Database("database.sqlite"), {
    provider: "sqlite",
  }),
  plugins: [organization(), admin()],
  telemetry: {
    enabled: false,
  },
});
