import { CreateOrganizationUseCaseImpl } from "@domain-impl/applications/create-organization.use-case";
import {
  OrganizationFactoryImpl,
  OrganizationPolicyImple,
} from "@domain-impl/domains/organization";
import { OperationNotPermittedErrorImpl } from "@domain-impl/errors";
import { UserRole } from "@roppoh/domain";
import { runEffectAndGetError } from "@test/helpers/run-effect-and-get-error";
import { Effect } from "effect";
import { Container } from "inversify";
import { describe, expect, test } from "vitest";

describe("CreateOrganizationUseCaseImpl", () => {
  async function di() {
    const container = new Container();
    container.bind(OrganizationFactoryImpl).toSelf();
    container.bind(OrganizationPolicyImple).toSelf();
    container.bind(CreateOrganizationUseCaseImpl).toSelf();

    return await container.getAsync(CreateOrganizationUseCaseImpl);
  }

  test("throws OperationNotPermittedError when user role is not SUPER_ADMIN", async () => {
    // arrange
    const useCase = await di();
    const user = {
      email: "user@example.com",
      id: "user-1",
      image: "https://example.com/avatar.png",
      name: "Regular User",
      organizationId: "org-1",
      role: undefined,
    };
    const organization = {
      id: "new-org-1",
      image: "https://example.com/org.png",
      name: "New Organization",
    };

    // act
    const actual = await runEffectAndGetError(
      useCase.invoke({ organization, user }),
    );

    // assert
    expect(actual).toBeInstanceOf(OperationNotPermittedErrorImpl);
    expect((actual as OperationNotPermittedErrorImpl).operation).toBe(
      "create organization by user permission checking.",
    );
    expect((actual as OperationNotPermittedErrorImpl).reason).toBe(
      "User roles are insufficient.",
    );
  });

  test("throws OperationNotPermittedError when user role is undefined", async () => {
    // arrange
    const useCase = await di();
    const user = {
      email: "norole@example.com",
      id: "user-2",
      image: "https://example.com/avatar2.png",
      name: "No Role User",
      organizationId: "org-2",
      role: undefined,
    };
    const organization = {
      id: "new-org-2",
      image: "https://example.com/org2.png",
      name: "Another Organization",
    };

    // act
    const actual = await runEffectAndGetError(
      useCase.invoke({ organization, user }),
    );

    // assert
    expect(actual).toBeInstanceOf(OperationNotPermittedErrorImpl);
    expect((actual as OperationNotPermittedErrorImpl).operation).toBe(
      "create organization by user permission checking.",
    );
    expect((actual as OperationNotPermittedErrorImpl).reason).toBe(
      "User roles are insufficient.",
    );
  });

  test("creates organization successfully when user is SUPER_ADMIN", async () => {
    // arrange
    const useCase = await di();
    const user = {
      email: "admin@example.com",
      id: "admin-1",
      image: "https://example.com/admin.png",
      name: "Super Admin",
      organizationId: "org-admin",
      role: UserRole.SUPER_ADMIN,
    };
    const organization = {
      id: "new-org-3",
      image: "https://example.com/admin-org.png",
      name: "Admin Created Org",
    };

    // act
    const actual = await Effect.runPromise(
      useCase.invoke({ organization, user }),
    );

    // assert
    expect(actual).toBeDefined();
    expect(actual.id).toBe("new-org-3");
    expect(actual.name).toBe("Admin Created Org");
    expect(actual.image).toBe("https://example.com/admin-org.png");
  });

  test("returned organization has correct properties", async () => {
    // arrange
    const useCase = await di();
    const user = {
      email: "admin2@example.com",
      id: "admin-2",
      image: "https://example.com/admin2.png",
      name: "Another Admin",
      organizationId: "org-admin-2",
      role: UserRole.SUPER_ADMIN,
    };
    const organization = {
      id: "new-org-4",
      image: "https://example.com/validated-org.png",
      name: "Validated Organization",
    };

    // act
    const actual = await Effect.runPromise(
      useCase.invoke({ organization, user }),
    );

    // assert
    expect(actual).toHaveProperty("id");
    expect(actual).toHaveProperty("name");
    expect(actual).toHaveProperty("image");
    expect(actual.id).toBe(organization.id);
    expect(actual.name).toBe(organization.name);
    expect(actual.image).toBe(organization.image);
  });
});
