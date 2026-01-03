import type { Organization } from "@domain/domains/organization";
import type { Server, ServerPolicy } from "@domain/domains/server";
import type { ServerRepository } from "@domain/domains/server/server.repository";
import type { User } from "@domain/domains/user";
import type { Compose } from "@domain/types/compose";

export interface StartServerByUserUseCase {
  readonly serverRepository: ServerRepository;
  readonly serverPolicy: ServerPolicy;

  invoke: (args: {
    serverId: string;
    user: User;
    Organization: Organization;
  }) => Compose<
    [ServerRepository["getById"], ServerPolicy["startByUser"], Server["start"]]
  >;
}
