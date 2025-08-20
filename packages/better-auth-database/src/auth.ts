import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

type BetterAuth = ReturnType<typeof betterAuth>;

export const auth: BetterAuth = betterAuth({
  database: new Database("database.sqlite"),
  telemetry: {
    enabled: false,
  },
});
