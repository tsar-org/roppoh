import type { Config } from "orval";

export default {
  coolify: {
    hooks: {
      afterAllFilesWrite: "bun run fix-numeric-types.ts",
    },
    input: {
      target: "../../coolify/openapi.yaml",
    },
    output: {
      baseUrl: {
        baseUrl: "https://coolify.tsar-bmb.org",
        getBaseUrlFromSpecification: false,
      },
      clean: true,
      client: "react-query",
      fileExtension: ".gen.ts",
      httpClient: "fetch",
      indexFiles: true,
      mock: {
        indexMockFiles: true,
        type: "msw",
      },
      mode: "tags-split",
      namingConvention: "kebab-case",
      override: {
        components: {
          parameters: {
            suffix: "Params",
          },
          requestBodies: {
            suffix: "Bodies",
          },
          responses: {
            suffix: "Response",
          },
          schemas: {
            itemSuffix: "Schema",
            suffix: "DTO",
          },
        },
      },
      schemas: "./model",
      target: "api.gen.ts",
      workspace: "src/",
    },
  },
} satisfies Config;
