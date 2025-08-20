import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite",
  schema: "./src/schema.ts",
  out: "src/migrations",
  migrations: {
    prefix: "timestamp",
  },
  dbCredentials: {
    url: "file:database.sqlite",
  },
  casing: "snake_case",
});
