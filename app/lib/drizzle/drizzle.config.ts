import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "app/database/schema.ts",
  out: "./app/database/migrations",
  migrations: {
    prefix: "timestamp",
  },
  casing: "snake_case",
});
