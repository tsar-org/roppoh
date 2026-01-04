import { DokployComposeClient } from "@domain-impl/Infrastructures/clients/dokploy/dokploy-compose-client";
import { DokployProjectClient } from "@domain-impl/Infrastructures/clients/dokploy/dokploy-project-client";
import {
  ComposeStatus,
  type ComposeStatusType,
} from "@domain-impl/Infrastructures/clients/dokploy/schema";
import { ServerControlServiceImpl } from "@domain-impl/services/server-control-service";
import { type ServerRepository, ServerStatus } from "@roppoh/domain";
import { Effect } from "effect";
import { inject, injectable, LazyServiceIdentifier } from "inversify";
import { ServerImpl } from "./server.entity";

@injectable()
export class ServerRepositoryImpl implements ServerRepository {
  public constructor(
    @inject(new LazyServiceIdentifier(() => DokployProjectClient))
    readonly project: DokployProjectClient,
    @inject(new LazyServiceIdentifier(() => DokployComposeClient))
    private readonly compose: DokployComposeClient,
    @inject(new LazyServiceIdentifier(() => ServerControlServiceImpl))
    private readonly control: ServerControlServiceImpl,
  ) {}

  public getById = ({ id }: { id: string }) =>
    Effect.gen(this, function* () {
      const compose = yield* this.compose.one({ id });

      return new ServerImpl({
        description: compose.description,
        id: compose.composeId,
        name: compose.name,
        organizationId: compose.organizationId || "",
        serverControlService: this.control,
        status: this.convertComposeStatusToServerStatus(compose.composeStatus),
      });
    });

  public getAllControllable = () =>
    Effect.gen(this, function* () {
      const composes = yield* this.project.getAllProject();

      const servers = composes
        .filter((project) => project.name !== "always-on")
        .flatMap((project) => project.environments)
        .flatMap((environment) => environment.compose)
        .map(
          (compose) =>
            new ServerImpl({
              description: compose.description,
              id: compose.composeId,
              name: compose.name,
              organizationId: compose.organizationId || "",
              serverControlService: this.control,
              status: this.convertComposeStatusToServerStatus(
                compose.composeStatus,
              ),
            }),
        );

      return servers;
    });

  /**
   * convertComposeStatusToServerStatus
   *
   * Compose["status"] -> Server["status"]
   */
  private convertComposeStatusToServerStatus = (status: ComposeStatusType) => {
    switch (status) {
      case ComposeStatus.DONE:
        return ServerStatus.RUNNING;
      case ComposeStatus.ERROR:
        return ServerStatus.ERROR;
      case ComposeStatus.IDLE:
        return ServerStatus.STOPPED;
      case ComposeStatus.RUNNING:
        return ServerStatus.BUILDING;
    }
  };
}
