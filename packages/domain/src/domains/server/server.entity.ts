import type { ExternalDependencyFailureError } from "@roppoh/domain/errors";
import { Brand, type Effect } from "effect";
import type { Organization } from "../organization";
import type { InvalidServerState } from "./server.error";

// Define branded type
type ServerId = string & Brand.Brand<"ServerId">;
export const serverId = Brand.nominal<ServerId>();

export enum ServerStatus {
  BUILDING = "building",
  ERROR = "error",
  RUNNING = "running",
  STOPPED = "stopped",
}

export interface Server {
  // Property
  readonly id: ServerId;
  readonly name: string;
  status: ServerStatus;
  readonly description: string;
  readonly organizationId: Organization["id"];
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
