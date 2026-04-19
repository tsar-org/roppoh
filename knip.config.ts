import type { KnipConfig } from "knip";

export default {
  bun: { config: ["package.json"] },
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/g)].join("\n"),
  },
  entry: [],
  ignore: [],
  ignoreBinaries: [".*"],
  ignoreDependencies: [],
  project: [],
  workspaces: {
    ".": {
      ignoreDependencies: ["turbo"],
    },
    "apps/roppoh": {
      entry: [],
      ignore: ["app/shadcn/**", "app/i18n/*.{ts,tsx}"],
      ignoreDependencies: ["tailwindcss-animate", "@radix-ui/react-select"],
      "react-router": {
        config: ["react-router.config.ts", "vite.config.ts"],
      },
      remix: {
        entry: [
          "app/root.tsx",
          "app/entry.{client,server}.tsx",
          "app/pages/**/page.tsx",
          "app/layouts/**/layout.tsx",
          "server.ts",
        ],
      },
      vite: { config: ["vite.config.ts"] },
      wrangler: { config: ["wrangler.jsonc"] },
    },
    "packages/better-auth": {},
    "packages/better-auth-database": {
      entry: ["src/auth.ts"],
      ignore: [
        // generated code
        "src/relations.ts",
      ],
    },
  },
} satisfies KnipConfig;
