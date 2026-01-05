import type { Organization } from "@roppoh/domain/domains/organization";
import type {
  Server,
  ServerPolicy,
  ServerRepository,
} from "@roppoh/domain/domains/server";
import type { User } from "@roppoh/domain/domains/user";
import type { EffectCompose } from "@roppoh/domain/types/compose";

export interface RestartServerByUserUseCase {
  readonly serverRepository: ServerRepository;

  invoke: (args: {
    serverId: string;
    user: User;
    Organization: Organization;
  }) => EffectCompose<
    [
      ServerRepository["getById"],
      ServerPolicy["restartByUser"],
      Server["restart"],
    ]
  >;
}
