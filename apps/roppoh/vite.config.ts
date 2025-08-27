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
      outDir: "build/client",
      devOptions: { enabled: true },
      manifest: {
        name: "roppoh",
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
