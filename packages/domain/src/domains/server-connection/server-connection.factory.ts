import type { ExternalDependencyFailureError } from "@roppoh/domain/errors";
import type { Effect } from "effect";
import type { Organization } from "../organization";
import type {
  ServerConnection,
  ServerConnectionConfig,
} from "./server-connection.entity";

export interface ServerConnectionFactory {
  create: (args: {
    organizationId: Organization["id"];
    config: ServerConnectionConfig;
  }) => Effect.Effect<ServerConnection, ExternalDependencyFailureError, never>;
}
