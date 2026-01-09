import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import { ENV } from "./test/helpers/env";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    env: ENV,
    include: ["./test/**/*.spec.ts"],
    setupFiles: ["./test/helpers/setup.ts"],
  },
});
