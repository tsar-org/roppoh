import type { Organization } from "@domain/domains/organization";
import type {
  Server,
  ServerPolicy,
  ServerRepository,
} from "@domain/domains/server";
import type { User } from "@domain/domains/user";
import type { Compose } from "@domain/types/compose";

export interface RestartServerByUserUseCase {
  readonly serverRepository: ServerRepository;

  invoke: (args: {
    serverId: string;
    user: User;
    Organization: Organization;
  }) => Compose<
    [
      ServerRepository["getById"],
      ServerPolicy["restartByUser"],
      Server["restart"],
    ]
  >;
}
