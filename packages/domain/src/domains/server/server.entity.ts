import type { ExternalDependencyFailureError } from "@domain/errors";
import type { Effect } from "effect";
import type { InvalidServerState } from "./server.error";

export enum ServerStatus {
  BUILDING = "building",
  ERROR = "error",
  RUNNING = "running",
  STOPPED = "stopped",
}

export interface Server {
  // Property
  readonly id: string;
  readonly name: string;
  status: ServerStatus;
  readonly description: string;
  readonly organizationId: string;
  readonly serverConnectionId: string;

  // Behavior
  start: () => Effect.Effect<
    void,
    InvalidServerState | ExternalDependencyFailureError,
    never
  >;
  stop: () => Effect.Effect<
    void,
    InvalidServerState | ExternalDependencyFailureError,
    never
  >;
  restart: () => Effect.Effect<void, ExternalDependencyFailureError, never>;
}
