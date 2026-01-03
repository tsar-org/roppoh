import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), cloudflare({ configPath: "./wrangler.jsonc" })],
  server: { port: 5173 },
});
