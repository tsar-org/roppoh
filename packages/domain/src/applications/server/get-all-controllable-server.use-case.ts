import type { ServerPolicy } from "@domain/domains/server";
import type { ServerRepository } from "@domain/domains/server/server.repository";
import type { ServerConnectionRepository } from "@domain/domains/server-connection/server-connection.repository";
import type { EffectCompose } from "@domain/types/compose";

export interface GetAllControllableServerUseCase {
  invoke: () => EffectCompose<
    [
      ServerPolicy["getByUser"],
      ServerConnectionRepository["getByOrganizationId"],
      ServerRepository["getAll"],
    ]
  >;
}
