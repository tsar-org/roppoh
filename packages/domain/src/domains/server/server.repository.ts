import type {
  ExternalContractViolationError,
  ResourceNotFoundError,
} from "@domain/errors";
import type { ExternalDependencyFailureError } from "@domain/errors/external-dependency-failure.error";
import type { Effect } from "effect";
import type { Server } from "./server.entity";

export interface ServerRepository {
  getById: ({
    id,
  }: {
    id: string;
  }) => Effect.Effect<
    Server,
    | ExternalDependencyFailureError
    | ResourceNotFoundError
    | ExternalContractViolationError,
    never
  >;

  getAllControllable: () => Effect.Effect<
    Server[],
    ExternalDependencyFailureError | ExternalContractViolationError,
    never
  >;
}
