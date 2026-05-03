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
    "apps/roppoh": {},
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
