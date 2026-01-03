import { ServerRepositoryImpl } from "@domain-impl/domains/server";
import type {
  GetAllControllableServerUseCase,
  ServerRepository,
} from "@roppoh/domain";
import { Effect } from "effect";
import { inject, injectable, LazyServiceIdentifier } from "inversify";

@injectable()
export class GetAllControllableServerUseCaseImpl
  implements GetAllControllableServerUseCase
{
  public constructor(
    @inject(new LazyServiceIdentifier(() => ServerRepositoryImpl))
    public readonly serverRepository: ServerRepository,
  ) {}

  public invoke = () =>
    Effect.gen(this, function* () {
      return yield* this.serverRepository.getAllControllable();
    });
}
