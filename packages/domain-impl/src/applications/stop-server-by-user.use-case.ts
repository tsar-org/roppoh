import {
  ServerPolicyImpl,
  ServerRepositoryImpl,
} from "@domain-impl/domains/server";
import type {
  Organization,
  ServerPolicy,
  ServerRepository,
  StopServerByUserUseCase,
  User,
} from "@roppoh/domain";
import { Effect } from "effect";
import { inject, LazyServiceIdentifier } from "inversify";

export class StopServerByUserUseCaseImpl implements StopServerByUserUseCase {
  public constructor(
    @inject(new LazyServiceIdentifier(() => ServerRepositoryImpl))
    public readonly serverRepository: ServerRepository,
    @inject(new LazyServiceIdentifier(() => ServerPolicyImpl))
    public readonly serverPolicy: ServerPolicy,
  ) {}

  public invoke = (args: {
    serverId: string;
    user: User;
    Organization: Organization;
  }) =>
    Effect.gen(this, function* () {
      const server = yield* this.serverRepository.getById({
        id: args.serverId,
      });

      yield* this.serverPolicy.stopByUser({
        organization: args.Organization,
        server: server,
        user: args.user,
      });

      yield* server.stop();
    });
}
