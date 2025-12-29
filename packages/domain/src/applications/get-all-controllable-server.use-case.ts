import type { ServerRepository } from "@domain/domains/server/server.repository";
import type { Compose } from "@domain/types/compose";

export interface GetAllControllableServerUseCase {
  readonly serverRepository: ServerRepository;

  invoke: () => Compose<[ServerRepository["getAllControllable"]]>;
}
