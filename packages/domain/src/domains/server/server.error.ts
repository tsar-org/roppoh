import type { Server } from "./server.entity";

export interface InvalidServerState extends Error {
  readonly requestedAction: string;
  readonly currentServerStatus: Server["status"];
}
