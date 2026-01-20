import * as v from "valibot";

export enum ComposeStatus {
  DONE = "done",
  ERROR = "error",
  IDLE = "idle",
  RUNNING = "running",
}

export const ComposeStatusSchema = v.union([
  v.literal(ComposeStatus.RUNNING),
  v.literal(ComposeStatus.IDLE),
  v.literal(ComposeStatus.ERROR),
  v.literal(ComposeStatus.DONE),
]);

export type ComposeStatusType = v.InferInput<typeof ComposeStatusSchema>;
