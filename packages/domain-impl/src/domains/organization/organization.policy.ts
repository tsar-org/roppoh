import { OperationNotPermittedErrorImpl } from "@domain-impl/errors";
import type { OrganizationPolicy, User } from "@roppoh/domain";
import { UserRole } from "@roppoh/domain";
import { Effect } from "effect";

export class OrganizationPolicyImple implements OrganizationPolicy {
  public canCreateOrganizationByUser = (args: { user: User }) =>
    Effect.gen(this, function* () {
      if (args.user.role !== UserRole.SUPER_ADMIN) {
        return yield* Effect.fail(
          new OperationNotPermittedErrorImpl({
            operation: "create organization by user permission checking.",
            reason: "User roles are insufficient.",
          }),
        );
      }
    });
}
