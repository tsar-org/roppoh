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
        // baseUrl: "https://coolify.tsar-bmb.org",
        baseUrl: "/api/coolify",
        // baseUrl: "http://192.168.123.123:8000/api/v1",
        getBaseUrlFromSpecification: false,
      },
      biome: true,
      clean: true,
      client: "react-query",
      fileExtension: ".gen.ts",
      headers: true,
      httpClient: "fetch",
      indexFiles: true,
      // mock: {
      //   indexMockFiles: true,
      //   type: "msw",
      // },
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
        query: {
          options: {
            staleTime: 10000,
          },
          signal: true,
          useInfinite: true,
          usePrefetch: true,
          useQuery: true,
          useSuspenseQuery: true,
        },
      },
      schemas: "./model",
      target: "api.gen.ts",
      workspace: "src/",
    },
  },
} satisfies Config;
