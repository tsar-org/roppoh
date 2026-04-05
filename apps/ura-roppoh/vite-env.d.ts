/** biome-ignore-all lint/correctness/noUnusedVariables: type definition file */

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_ZUNPACHI_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
