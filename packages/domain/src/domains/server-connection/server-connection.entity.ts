import type {
  ExternalDependencyFailureError,
  InvalidRequestError,
} from "@roppoh/domain/errors";
import { Brand, type Effect } from "effect";
import type { Organization } from "../organization";

// Define branded type
type ServerConnectionId = string & Brand.Brand<"ServerConnectionId">;
export const serverConnectionId = Brand.nominal<ServerConnectionId>();

export enum ServerProvider {
  DOKPLOY = "dokploy",
}

export type ServerConnectionConfig = {
  provider: ServerProvider.DOKPLOY;
  apiUrl: string;
  apiKey: string;
  header?: Record<string, string>;
};

export interface ServerConnection {
  // Property
  readonly id: ServerConnectionId;
  readonly organizationId: Organization["id"];
  readonly config: ServerConnectionConfig;

  // Behavior
  verify: () => Effect.Effect<
    void,
    InvalidRequestError | ExternalDependencyFailureError,
    never
  >;
}
