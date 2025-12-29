import {
  type Server,
  type ServerControlService,
  ServerStatus,
} from "@roppoh/domain";
import { Effect } from "effect";
import { InvalidServerStateErrorImpl } from "./server.error";

export class ServerImpl implements Server {
  // property
  public readonly id;
  public readonly name;
  public status;
  public readonly description;

  // deps
  private readonly serverControlService: ServerControlService;

  public constructor(
    args: Pick<Server, "id" | "name" | "status" | "description"> & {
      serverControlService: ServerControlService;
    },
  ) {
    this.id = args.id;
    this.name = args.name;
    this.status = args.status;
    this.description = args.description;
    this.serverControlService = args.serverControlService;
  }

  public start = () =>
    Effect.gen(this, function* () {
      if (this.status !== "stopped") {
        const error = new InvalidServerStateErrorImpl({
          currentServerStatus: this.status,
          requestedAction: "start",
        });
        return yield* Effect.fail(error);
      }

      yield* this.serverControlService.start({ id: this.id });
      this.status = ServerStatus.RUNNING;
    });

  public stop = () =>
    Effect.gen(this, function* () {
      if (this.status !== "running") {
        const error = new InvalidServerStateErrorImpl({
          currentServerStatus: this.status,
          requestedAction: "stop",
        });
        return yield* Effect.fail(error);
      }

      yield* this.serverControlService.stop({ id: this.id });
      this.status = ServerStatus.STOPPED;
    });

  public reStart = () =>
    Effect.gen(this, function* () {
      yield* this.serverControlService.reStart({ id: this.id });
      this.status = ServerStatus.RUNNING;
    });
}
