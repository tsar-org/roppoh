import type { OperationNotPermittedError } from "@domain/errors";
import type { Effect } from "effect";
import type { User } from "../user";

export interface OrganizationPolicy {
  canCreateOrganizationByUser: (args: {
    user: User;
  }) => Effect.Effect<void, OperationNotPermittedError, never>;
}
