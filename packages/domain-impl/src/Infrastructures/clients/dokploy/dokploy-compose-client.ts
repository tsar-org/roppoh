import { ExternalContractViolationErrorImpl } from "@domain-impl/errors/external-contract-violation.error";
import { ResourceNotFoundErrorImpl } from "@domain-impl/errors/resource-not-found.error";
import { Effect } from "effect";
import * as v from "valibot";
import { DokployResponseError } from "./error";
import { ComposeStatusSchema } from "./schema";

export class DokployComposeClient {
  private readonly projectAllResponseSchema = v.object({
    composeId: v.string(),
    composeStatus: ComposeStatusSchema,
    description: v.string(),
    name: v.string(),
    organizationId: v.optional(v.string()),
  });

  /**
   * @see https://docs.dokploy.com/docs/api/compose#compose-one
   */
  public one = ({
    id,
    serverUrl,
    apiKey,
    header,
  }: {
    id: string;
    serverUrl: string;
    apiKey: string;
    header?: RequestInit["headers"];
  }) =>
    Effect.gen(this, function* () {
      // compose request
      const url = new URL(`${serverUrl}/api/compose.one?composeId=${id}`);
      const requestInit = {
        headers: { "x-api-key": apiKey, ...header },
        method: "GET",
      } satisfies RequestInit;

      // fetch
      const response = yield* Effect.promise(() => fetch(url, requestInit));

      if (response.status === 404)
        return yield* Effect.fail(
          new ResourceNotFoundErrorImpl({
            resourceId: id,
            resourceType: "compose",
          }),
        );

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

      return parseResult.output;
    });

  /**
   * @see https://docs.dokploy.com/docs/api/compose#compose-start
   */
  public start = ({
    id,
    serverUrl,
    apiKey,
    header,
  }: {
    id: string;
    serverUrl: string;
    apiKey: string;
    header?: RequestInit["headers"];
  }) =>
    Effect.gen(this, function* () {
      // compose request
      const url = new URL(`${serverUrl}/api/compose.start`);
      const requestInit = {
        body: JSON.stringify({ composeId: id }),
        headers: { "x-api-key": apiKey, ...header },
        method: "GET",
      } satisfies RequestInit;

      // fetch
      const response = yield* Effect.promise(() => fetch(url, requestInit));

      if (response.status !== 200)
        return yield* Effect.fail(new DokployResponseError({ response }));
    });

  /**
   * @see https://docs.dokploy.com/docs/api/compose#compose-stop
   */
  public stop = ({
    id,
    serverUrl,
    apiKey,
    header,
  }: {
    id: string;
    serverUrl: string;
    apiKey: string;
    header?: RequestInit["headers"];
  }) =>
    Effect.gen(this, function* () {
      // compose request
      const url = new URL(`${serverUrl}/api/compose.stop`);
      const requestInit = {
        body: JSON.stringify({ composeId: id }),
        headers: { "x-api-key": apiKey, ...header },
        method: "GET",
      } satisfies RequestInit;

      // fetch
      const response = yield* Effect.promise(() => fetch(url, requestInit));

      if (response.status !== 200)
        return yield* Effect.fail(new DokployResponseError({ response }));
    });

  /**
   * @see https://docs.dokploy.com/docs/api/compose#compose-redeploy
   */
  public redeploy = ({
    id,
    serverUrl,
    apiKey,
    header,
  }: {
    id: string;
    serverUrl: string;
    apiKey: string;
    header?: RequestInit["headers"];
  }) =>
    Effect.gen(this, function* () {
      // compose request
      const url = new URL(`${serverUrl}/api/compose.redeploy`);
      const requestInit = {
        body: JSON.stringify({ composeId: id }),
        headers: { "x-api-key": apiKey, ...header },
        method: "GET",
      } satisfies RequestInit;

      // fetch
      const response = yield* Effect.promise(() => fetch(url, requestInit));

      if (response.status !== 200)
        return yield* Effect.fail(new DokployResponseError({ response }));
    });
}
