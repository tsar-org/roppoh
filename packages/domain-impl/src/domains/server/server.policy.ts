import { OperationNotPermittedErrorImpl } from "@domain-impl/errors";
import type { Organization, Server, ServerPolicy, User } from "@roppoh/domain";
import { Effect } from "effect";

export class ServerPolicyImpl implements ServerPolicy {
  public startByUser = (args: {
    organization: Organization;
    server: Server;
    user: User;
  }) =>
    Effect.gen(this, function* () {
      if (
        args.organization.id !== args.server.organizationId ||
        args.server.organizationId !== args.user.organizationId
      ) {
        return yield* Effect.fail(
          new OperationNotPermittedErrorImpl({
            operation: "start server by user permission checking",
            reason: "server is not found",
          }),
        );
      }
    });

  public stopByUser = (args: {
    organization: Organization;
    server: Server;
    user: User;
  }) =>
    Effect.gen(this, function* () {
      if (
        args.organization.id !== args.server.organizationId ||
        args.server.organizationId !== args.user.organizationId
      ) {
        return yield* Effect.fail(
          new OperationNotPermittedErrorImpl({
            operation: "start server by user permission checking",
            reason: "server is not found",
          }),
        );
      }
    });

  public restartByUser = (args: {
    organization: Organization;
    server: Server;
    user: User;
  }) =>
    Effect.gen(this, function* () {
      if (
        args.organization.id !== args.server.organizationId ||
        args.server.organizationId !== args.user.organizationId
      ) {
        return yield* Effect.fail(
          new OperationNotPermittedErrorImpl({
            operation: "start server by user permission checking",
            reason: "server is not found",
          }),
        );
      }
    });
}
