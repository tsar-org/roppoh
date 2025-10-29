import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {},
  plugins: [
    devtoolsJson(),
    VitePWA({
      base: "/",
      devOptions: { enabled: false },
      includeAssets: [],
      manifest: {
        background_color: "#000000",
        display: "standalone",
        icons: [
          {
            sizes: "192x192",
            src: "icons/tsar-192x192.png",
            type: "image/png",
          },
          {
            sizes: "512x512",
            src: "icons/tsar-512x512.png",
            type: "image/png",
          },
        ],
        name: "roppoh",
        short_name: "roppoh",
        theme_color: "#000000",
      },
      outDir: "build/client",
      registerType: "autoUpdate",
      scope: "/",
      strategies: "generateSW",
      workbox: {
        globDirectory: "build/client",
        globPatterns: ["**/*.{css,svg,js}"], // HTMLは除外
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallback: "offline.html",
      },
    }),
    cloudflare({
      configPath: "./wrangler.jsonc",
      viteEnvironment: { name: "ssr" },
    }),
    reactRouter(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  publicDir: "./public",
  server: {
    port: 3000,
  },
});
