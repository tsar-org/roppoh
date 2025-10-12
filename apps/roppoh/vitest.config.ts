import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [react(), tailwindcss(), tsconfigPaths()],
        test: {
          browser: {
            enabled: true,
            expect: {
              toMatchScreenshot: {
                comparatorName: "pixelmatch",
                comparatorOptions: {
                  // 3% of pixels can differ
                  allowedMismatchedPixelRatio: 0.03,
                  // 0-1, how different can colors be?
                  threshold: 0.2,
                },
              },
            },
            headless: true,
            instances: [{ browser: "chromium" as const }],
            provider: playwright(),
          },
          env: {
            VITE_BASE_URL: "http://localhost:3000",
          },
          name: "visual",
          testTimeout: 30000,
        },
      },
    ],
  },
});
