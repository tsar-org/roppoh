import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW",
      base: "/",
      scope: "/",
      includeAssets: ["favicon.ico", "tsar-icon.png"],
      outDir: "build/client",
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
        suppressWarnings: true,
      },
      workbox: {
        globDirectory: "build/client",
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
      manifest: {
        name: "roppoh",
        short_name: "roppoh",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            sizes: "192x192",
            src: "tsar-icon.png",
            type: "image/png",
          },
          {
            sizes: "512x512",
            src: "tsar-icon.png",
            type: "image/png",
          },
        ],
      },
    }),
    cloudflare({
      viteEnvironment: { name: "ssr" },
      configPath: "./wrangler.jsonc",
    }),
    reactRouter(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
