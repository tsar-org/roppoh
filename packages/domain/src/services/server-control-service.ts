import type { ExternalDependencyFailureError } from "@domain/errors/external-dependency-failure.error";
import type { Effect } from "effect";

export interface ServerControlService {
  start: ({
    id,
  }: {
    id: string;
  }) => Effect.Effect<void, ExternalDependencyFailureError, never>;
  stop: ({
    id,
  }: {
    id: string;
  }) => Effect.Effect<void, ExternalDependencyFailureError, never>;
  reStart: ({
    id,
  }: {
    id: string;
  }) => Effect.Effect<void, ExternalDependencyFailureError, never>;
}
