import type { InvalidServerState, Server } from "@roppoh/domain";

export class InvalidServerStateErrorImpl
  extends Error
  implements InvalidServerState
{
  public readonly requestedAction;
  public readonly currentServerStatus;

  public constructor({
    requestedAction,
    currentServerStatus,
  }: {
    requestedAction: string;
    currentServerStatus: Server["status"];
  }) {
    const message = `Cannot ${requestedAction} server when status is "${currentServerStatus}"`;
    super(message);
    this.requestedAction = requestedAction;
    this.currentServerStatus = currentServerStatus;
  }
}
