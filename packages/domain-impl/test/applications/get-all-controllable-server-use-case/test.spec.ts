import { GetAllControllableServerUseCaseImpl } from "@domain-impl/applications";
import { ServerRepositoryImpl } from "@domain-impl/domains/server/server.repository";
import { ExternalContractViolationErrorImpl } from "@domain-impl/errors/external-contract-violation.error";
import { DokployComposeClient } from "@domain-impl/Infrastructures/clients/dokploy/dokploy-compose-client";
import { DokployProjectClient } from "@domain-impl/Infrastructures/clients/dokploy/dokploy-project-client";
import { DokployResponseError } from "@domain-impl/Infrastructures/clients/dokploy/error";
import { ServerControlServiceImpl } from "@domain-impl/services/server-control-service";
import { ENV } from "@test/helpers/env";
import { runEffectAndGetError } from "@test/helpers/run-effect-and-get-error";
import { Effect } from "effect";
import { Container } from "inversify";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { invalidResponse, status200, status500 } from "./handler.msw";

describe("GetAllControllableServerUseCaseImpl", async () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  async function di() {
    const container = new Container();
    container.bind(DokployProjectClient).toDynamicValue(
      () =>
        new DokployProjectClient({
          apiKey: ENV.DOKPLOY_API_KEY,
          serverUrl: ENV.DOKPLOY_SERVER_URL,
        }),
    );
    container.bind(DokployComposeClient).toDynamicValue(
      () =>
        new DokployComposeClient({
          apiKey: ENV.DOKPLOY_API_KEY,
          serverUrl: ENV.DOKPLOY_SERVER_URL,
        }),
    );
    container.bind(ServerControlServiceImpl).toSelf();
    container.bind(ServerRepositoryImpl).toSelf();
    container.bind(GetAllControllableServerUseCaseImpl).toSelf();

    return await container.getAsync(GetAllControllableServerUseCaseImpl);
  }

  test("returns controllable servers on success", async () => {
    // arrange
    server.use(...[status200]);
    const useCase = await di();

    // act
    const actual = await Effect.runPromise(useCase.invoke());

    // assert
    expect(actual.length).toBe(1);
    expect(actual[0]?.name).toBe("compose-name");
  });

  test("when dokploy returns 500", async () => {
    // arrange
    server.use(...[status500]);
    const useCase = await di();

    // act
    const actual = await runEffectAndGetError(useCase.invoke());

    // assert
    expect(actual).toBeInstanceOf(DokployResponseError);
    expect(actual.externalDependencyName).toBe("dokploy");
  });

  test("when dokploy returns an invalid response", async () => {
    // arrange
    server.use(...[invalidResponse]);
    const useCase = await di();

    // act
    const actual = await runEffectAndGetError(useCase.invoke());

    // assert
    expect(actual).toBeInstanceOf(ExternalContractViolationErrorImpl);
    expect(actual.externalDependencyName).toBe("dokploy");
  });
});
