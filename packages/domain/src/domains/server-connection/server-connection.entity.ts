import type {
  ExternalDependencyFailureError,
  InvalidRequestError,
} from "@domain/errors";
import type { Effect } from "effect";

export enum ServerProvider {
  DOKPLOY = "dokploy",
}

type ServerConnectionConfig = {
  provider: ServerProvider.DOKPLOY;
  apiUrl: string;
  apiKey: string;
  header?: Record<string, string>;
};

export interface ServerConnection {
  // Property
  readonly id: string;
  readonly organizationId: string;
  readonly config: ServerConnectionConfig;

  // Behavior
  verify: () => Effect.Effect<
    void,
    InvalidRequestError | ExternalDependencyFailureError,
    never
  >;
}
