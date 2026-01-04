import { DokployComposeClient } from "@domain-impl/Infrastructures/clients/dokploy/dokploy-compose-client";
import type { ServerControlService } from "@roppoh/domain";
import { Effect } from "effect";
import { inject, LazyServiceIdentifier } from "inversify";

export class ServerControlServiceImpl implements ServerControlService {
  public constructor(
    @inject(new LazyServiceIdentifier(() => DokployComposeClient))
    private readonly client: DokployComposeClient,
  ) {}

  public start = ({ id }: { id: string }) =>
    Effect.gen(this, function* () {
      yield* this.client.start({ id });
    });

  public stop = ({ id }: { id: string }) =>
    Effect.gen(this, function* () {
      yield* this.client.stop({ id });
    });

  public reStart = ({ id }: { id: string }) =>
    Effect.gen(this, function* () {
      yield* this.client.redeploy({ id });
    });
}
