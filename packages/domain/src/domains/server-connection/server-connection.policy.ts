import type { OperationNotPermittedError } from "@roppoh/domain/errors";
import type { Effect } from "effect";
import type { User } from "../user";

export interface ServerConnectionPolicy {
  createByUser: (args: {
    user: User;
  }) => Effect.Effect<void, OperationNotPermittedError, never>;
}
