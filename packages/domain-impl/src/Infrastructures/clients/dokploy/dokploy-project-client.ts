import { ExternalContractViolationErrorImpl } from "@domain-impl/errors/external-contract-violation.error";
import { Effect } from "effect";
import * as v from "valibot";
import { DokployResponseError } from "./error";
import { ComposeStatusSchema } from "./schema";

export class DokployProjectClient {
  private readonly SERVER_URL: string;
  private readonly API_KEY: string;
  private readonly header: RequestInit["headers"];

  private readonly projectAllResponseSchema = v.array(
    v.object({
      createdAt: v.string(),
      description: v.string(),
      environments: v.array(
        v.object({
          compose: v.array(
            v.object({
              composeId: v.string(),
              composeStatus: ComposeStatusSchema,
              description: v.string(),
              name: v.string(),
            }),
          ),
          createdAt: v.string(),
          description: v.string(),
          environmentId: v.string(),
          name: v.string(),
        }),
      ),
      name: v.string(),
      projectId: v.string(),
    }),
  );

  public constructor({
    serverUrl,
    apiKey,
    header,
  }: {
    serverUrl: string;
    apiKey: string;
    header?: RequestInit["headers"];
  }) {
    this.API_KEY = apiKey;
    this.SERVER_URL = serverUrl;
    this.header = header;
  }

  /**
   * @see https://docs.dokploy.com/docs/api/project#project-all
   */
  public getAllProject = () =>
    Effect.gen(this, function* () {
      // compose request
      const url = new URL(`${this.SERVER_URL}/api/project.all`);
      const requestInit = {
        headers: { "x-api-key": this.API_KEY, ...this.header },
        method: "GET",
      } satisfies RequestInit;

      // fetch
      const response = yield* Effect.promise(() => fetch(url, requestInit));

      if (response.status !== 200)
        return yield* Effect.fail(new DokployResponseError({ response }));

      // parse response
      const body = yield* Effect.promise(() => response.json());
      const parseResult = v.safeParse(this.projectAllResponseSchema, body);

      if (parseResult.success === false)
        return yield* Effect.fail(
          new ExternalContractViolationErrorImpl({
            contract: "response-schema",
            externalDependencyName: "dokploy",
            response: response,
          }),
        );

      return yield* Effect.succeed(parseResult.output);
    });
}
