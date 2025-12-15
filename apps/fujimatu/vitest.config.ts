import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    // env: {
    //   DISCORD_CLIENT_ID: "DISCORD_CLIENT_ID",
    //   DISCORD_CLIENT_SECRET: "DISCORD_CLIENT_SECRET",
    //   DISCORD_REDIRECT_URL: "DISCORD_REDIRECT_URL",
    // },
    poolOptions: {
      workers: { wrangler: { configPath: "./wrangler.jsonc" } },
    },
  },
});
