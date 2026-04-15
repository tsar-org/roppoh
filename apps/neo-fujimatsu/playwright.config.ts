import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./test/vrt",
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  retries: 0,
  workers: undefined,

  use: {
    baseURL: "http://localhost:3002",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    viewport: { width: 1280, height: 720 },
  },

  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],

  // 開発サーバー自動起動
  webServer: {
    command: "bun run dev",
    url: "http://localhost:3002",
    reuseExistingServer: false,
    timeout: 120 * 1000,
    env: {},
  },
});
