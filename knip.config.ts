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
    ".": { ignoreDependencies: ["turbo"] },
    "apps/roppoh": {},
    "packages/better-auth": {},
    "packages/better-auth-database": {
      entry: ["src/auth.ts"],
      ignore: ["src/relations.ts"], // generated code
    },
    "apps/emdash": {
      ignore: ["src/**"],
      astro: {
        config: ["astro.config.mts"],
        entry: ["src/pages/**/*.{astro,mdx,js,ts}"],
      },
    },
  },
} satisfies KnipConfig;
