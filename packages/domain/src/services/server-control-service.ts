import type { Server } from "@domain/domains/server";
import type { ServerConnection } from "@domain/domains/server-connection";
import type { ExternalDependencyFailureError } from "@domain/errors/external-dependency-failure.error";
import type { Effect } from "effect";

export interface ServerControlService {
  start: (args: {
    server: Server;
    serverConnection: ServerConnection;
  }) => Effect.Effect<void, ExternalDependencyFailureError, never>;
  stop: (args: {
    server: Server;
    serverConnection: ServerConnection;
  }) => Effect.Effect<void, ExternalDependencyFailureError, never>;
  reStart: (args: {
    server: Server;
    serverConnection: ServerConnection;
  }) => Effect.Effect<void, ExternalDependencyFailureError, never>;
}
