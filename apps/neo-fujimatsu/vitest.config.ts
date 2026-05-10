import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    projects: [
      {
        plugins: [
          tsconfigPaths(),
          cloudflareTest({ wrangler: { configPath: "./wrangler.test.jsonc" } }),
        ],
        test: {
          env: {
            BETTER_AUTH_SECRET: "test-secret",
          },
          include: ["./test/e2e/**/*.spec.ts"],
          name: "e2e",
          testTimeout: 15_000,
        },
      },
    ],
  },
});
