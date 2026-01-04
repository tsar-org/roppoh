import type { Effect } from "effect";
import type { ServerConnection } from "./server-connection.entity";

export interface ServerConnectionRepository {
  getByOrganizationId: (args: {
    organizationId: string;
  }) => Effect.Effect<ServerConnection[], never, never>;
  getByServerId: (args: {
    serverId: string;
  }) => Effect.Effect<ServerConnection, never, never>;
  getById: (args: {
    id: string;
  }) => Effect.Effect<ServerConnection, never, never>;
}
