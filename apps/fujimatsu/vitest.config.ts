import { defineWorkersProject } from "@cloudflare/vitest-pool-workers/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      defineWorkersProject({
        plugins: [tsconfigPaths()],
        test: {
          include: ["./test/e2e/**/*.spec.ts"],
          name: "e2e",
          poolOptions: {
            workers: { wrangler: { configPath: "./wrangler.jsonc" } },
          },
        },
      }),
      defineWorkersProject({
        plugins: [tsconfigPaths()],
        test: {
          include: ["./test/workers-unit/**/*.spec.ts"],
          name: "workers-unit",
          poolOptions: {
            workers: { wrangler: { configPath: "./wrangler.jsonc" } },
          },
        },
      }),
    ],
  },
});
