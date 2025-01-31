// generated by `pnpm dlx @eslint/migrate-config .eslintrc[.js/json/yml]`
import nextOnPages from "eslint-plugin-next-on-pages";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:eslint-plugin-next-on-pages/recommended",
    "prettier",
  ),
  {
    plugins: {
      "next-on-pages": nextOnPages,
    },
  },
];

export default eslintConfig;
