import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    projects: [
      {
        plugins: [tsconfigPaths()],
        test: {
          include: ["./test/e2e/**/*.spec.ts"],
          name: "e2e",
        },
      },
    ],
  },
});
