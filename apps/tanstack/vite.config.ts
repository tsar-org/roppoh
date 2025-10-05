import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    VitePWA({
      base: "/",
      devOptions: {
        enabled: true,
        navigateFallback: "/",
        suppressWarnings: true,
        type: "module",
      },
      includeAssets: ["favicon.ico", "icons/tsar-icon.png"],
      manifest: {
        background_color: "#ffffff",
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
        theme_color: "#ffffff",
      },
      outDir: "build/client",
      registerType: "autoUpdate",
      scope: "/",
      strategies: "generateSW",
      workbox: {
        globDirectory: "build/client",
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
    cloudflare({
      configPath: "./wrangler.jsonc",
      viteEnvironment: { name: "ssr" },
    }),
    viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      server: { entry: "./entry.server.ts" },
      srcDirectory: "src",
      // start: { entry: "./start-instance.ts" },
    }),
    viteReact(),
  ],
  server: { port: 3000 },
});

export default config;
