import type { Organization } from "@roppoh/domain/domains/organization";
import type { Server, ServerPolicy } from "@roppoh/domain/domains/server";
import type { ServerRepository } from "@roppoh/domain/domains/server/server.repository";
import type { User } from "@roppoh/domain/domains/user";
import type { EffectCompose } from "@roppoh/domain/types/compose";

export interface StopServerByUserUseCase {
  readonly serverRepository: ServerRepository;

  invoke: (args: {
    serverId: string;
    user: User;
    Organization: Organization;
  }) => EffectCompose<
    [ServerRepository["getById"], ServerPolicy["stopByUser"], Server["stop"]]
  >;
}
