import { defineConfig } from "drizzle-kit";

export default defineConfig({
  casing: "snake_case",
  dbCredentials: {
    url: "file:database.sqlite",
  },
  dialect: "sqlite",
  migrations: {
    prefix: "timestamp",
  },
  out: "./src/migrations",
  schema: "./src/auth-schema.ts",
});
