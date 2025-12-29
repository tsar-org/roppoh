import type { ExternalDependencyFailureError } from "@domain/errors/external-dependency-failure.error";
import type { Effect } from "effect";
import type { InvalidServerState } from "./server.error";

export enum ServerStatus {
  BUILDING = "building",
  ERROR = "error",
  RUNNING = "running",
  STOPPED = "stopped",
}

export interface Server {
  // property
  readonly id: string;
  readonly name: string;
  status: ServerStatus;
  readonly description: string;

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
  reStart: () => Effect.Effect<void, ExternalDependencyFailureError, never>;
}
