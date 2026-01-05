import type { OperationNotPermittedError } from "@domain/errors";
import type { Effect } from "effect";
import type { Organization } from "../organization";
import type { User } from "../user";
import type { Server } from "./server.entity";

export interface ServerPolicy {
  getByUser: (args: {
    user: User;
  }) => Effect.Effect<void, OperationNotPermittedError, never>;

  startByUser: (args: {
    organization: Organization;
    server: Server;
    user: User;
  }) => Effect.Effect<void, OperationNotPermittedError, never>;

  stopByUser: (args: {
    organization: Organization;
    server: Server;
    user: User;
  }) => Effect.Effect<void, OperationNotPermittedError, never>;

  restartByUser: (args: {
    organization: Organization;
    server: Server;
    user: User;
  }) => Effect.Effect<void, OperationNotPermittedError, never>;
}
