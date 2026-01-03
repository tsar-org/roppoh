import { StopServerByUserUseCaseImpl } from "@domain-impl/applications";
import { InvalidServerStateErrorImpl } from "@domain-impl/domains/server/server.error";
import { ServerPolicyImpl } from "@domain-impl/domains/server/server.policy";
import { ServerRepositoryImpl } from "@domain-impl/domains/server/server.repository";
import { ExternalContractViolationErrorImpl } from "@domain-impl/errors/external-contract-violation.error";
import { ResourceNotFoundErrorImpl } from "@domain-impl/errors/resource-not-found.error";
import { DokployComposeClient } from "@domain-impl/Infrastructures/clients/dokploy/dokploy-compose-client";
import { DokployProjectClient } from "@domain-impl/Infrastructures/clients/dokploy/dokploy-project-client";
import { DokployResponseError } from "@domain-impl/Infrastructures/clients/dokploy/error";
import { ServerControlServiceImpl } from "@domain-impl/services/server-control-service";
import { ENV } from "@test/helpers/env";
import { runEffectAndGetError } from "@test/helpers/run-effect-and-get-error";
import { Container } from "inversify";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import {
  composeOneInvalidResponse,
  composeOneStatus200Building,
  composeOneStatus404,
  composeOneStatus500,
} from "./handler.msw";

describe("StopServerByUserUseCaseImpl", () => {
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
    container.bind(ServerPolicyImpl).toSelf();
    container.bind(StopServerByUserUseCaseImpl).toSelf();

    return await container.getAsync(StopServerByUserUseCaseImpl);
  }

  test("throws ResourceNotFoundError when compose.one returns 404", async () => {
    // arrange
    server.use(composeOneStatus404);
    const useCase = await di();

    // act
    const actual = await runEffectAndGetError(
      useCase.invoke({ serverId: "test-compose-id" }),
    );

    // assert
    expect(actual).toBeInstanceOf(ResourceNotFoundErrorImpl);
    expect((actual as ResourceNotFoundErrorImpl).resourceType).toBe("compose");
    expect((actual as ResourceNotFoundErrorImpl).resourceId).toBe(
      "test-compose-id",
    );
  });

  test("throws DokployResponseError when compose.one returns 500", async () => {
    // arrange
    server.use(composeOneStatus500);
    const useCase = await di();

    // act
    const actual = await runEffectAndGetError(
      useCase.invoke({ serverId: "test-compose-id" }),
    );

    // assert
    expect(actual).toBeInstanceOf(DokployResponseError);
    expect((actual as DokployResponseError).externalDependencyName).toBe(
      "dokploy",
    );
  });

  test("throws ExternalContractViolationError when compose.one returns invalid response", async () => {
    // arrange
    server.use(composeOneInvalidResponse);
    const useCase = await di();

    // act
    const actual = await runEffectAndGetError(
      useCase.invoke({ serverId: "test-compose-id" }),
    );

    // assert
    expect(actual).toBeInstanceOf(ExternalContractViolationErrorImpl);
    expect(
      (actual as ExternalContractViolationErrorImpl).externalDependencyName,
    ).toBe("dokploy");
    expect((actual as ExternalContractViolationErrorImpl).contract).toBe(
      "response-schema",
    );
  });

  test("throws InvalidServerStateError when server status is not running", async () => {
    // arrange
    server.use(composeOneStatus200Building);
    const useCase = await di();
    const user = {
      email: "test@example.com",
      id: "user-1",
      image: "https://example.com/avatar.png",
      name: "Test User",
      organizationId: "org-1",
      role: undefined,
    };
    const organization = {
      id: "org-1",
      image: "https://example.com/org.png",
      name: "Test Organization",
    };

    // act
    const actual = await runEffectAndGetError(
      useCase.invoke({
        Organization: organization,
        serverId: "test-compose-id",
        user,
      }),
    );

    // assert
    expect(actual).toBeInstanceOf(InvalidServerStateErrorImpl);
    expect((actual as InvalidServerStateErrorImpl).requestedAction).toBe(
      "stop",
    );
    expect((actual as InvalidServerStateErrorImpl).currentServerStatus).toBe(
      "building",
    );
  });
});
