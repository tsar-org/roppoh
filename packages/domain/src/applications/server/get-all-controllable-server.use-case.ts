import type { ServerPolicy } from "@roppoh/domain/domains/server";
import type { ServerRepository } from "@roppoh/domain/domains/server/server.repository";
import type { ServerConnectionRepository } from "@roppoh/domain/domains/server-connection/server-connection.repository";
import type { EffectCompose } from "@roppoh/domain/types/compose";

export interface GetAllServerUseCase {
  invoke: () => EffectCompose<
    [
      ServerPolicy["getByUser"],
      ServerConnectionRepository["getByOrganizationId"],
      ServerRepository["getAll"],
    ]
  >;
}
