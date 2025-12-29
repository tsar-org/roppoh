import type { InvalidServerState } from "@domain/domains/server/server.error";
import type { ServerRepository } from "@domain/domains/server/server.repository";
import type {
  ExternalDependencyFailureError,
  ResourceNotFoundError,
} from "@domain/errors";
import type { Effect } from "effect";

export interface StartServerByUserUseCase {
  readonly serverRepository: ServerRepository;

  invoke: (args: {
    serverId: string;
  }) => Effect.Effect<
    void,
    ExternalDependencyFailureError | InvalidServerState | ResourceNotFoundError,
    never
  >;
}
