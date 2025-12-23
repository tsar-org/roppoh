// import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: {
      DISCORD_CLIENT_ID: "DISCORD_CLIENT_ID",
      DISCORD_CLIENT_SECRET: "DISCORD_CLIENT_SECRET",
      DISCORD_REDIRECT_URL: "DISCORD_REDIRECT_URL",
    },
  },
});
