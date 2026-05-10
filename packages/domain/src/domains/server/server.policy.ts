import type { OperationNotPermittedError } from "@roppoh/domain/errors";
import type { Effect } from "effect";

import type { Organization } from "../organization";
import type { User } from "../user";
import type { Server } from "./server.entity";

export interface ServerPolicy {
  getByUser: (args: { user: User }) => Effect.Effect<void, OperationNotPermittedError>;

  startByUser: (args: {
    organization: Organization;
    server: Server;
    user: User;
  }) => Effect.Effect<void, OperationNotPermittedError>;

  stopByUser: (args: {
    organization: Organization;
    server: Server;
    user: User;
  }) => Effect.Effect<void, OperationNotPermittedError>;

  restartByUser: (args: {
    organization: Organization;
    server: Server;
    user: User;
  }) => Effect.Effect<void, OperationNotPermittedError>;
}
