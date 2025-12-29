import { ServerRepositoryImpl } from "@domain-impl/domains/server/server.repository";
import type {
  RestartServerByUserUseCase,
  ServerRepository,
} from "@roppoh/domain";
import { Effect } from "effect";
import { inject, LazyServiceIdentifier } from "inversify";

export class RestartServerByUserUseCaseImpl
  implements RestartServerByUserUseCase
{
  public constructor(
    @inject(new LazyServiceIdentifier(() => ServerRepositoryImpl))
    public readonly serverRepository: ServerRepository,
  ) {}

  public invoke = ({ serverId }: { serverId: string }) =>
    Effect.gen(this, function* () {
      const server = yield* this.serverRepository.getById({ id: serverId });

      yield* server.reStart();
    });
}
