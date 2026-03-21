import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 100,
  semi: true,
  singleQuote: false,
  sortImports: {},
  sortPackageJso: true,
  sortTailwindcssTailwind: true,
  trailingComma: "all",
  useTabs: false,
  ignorePatterns: ["worker-configuration.d.ts"],
});
