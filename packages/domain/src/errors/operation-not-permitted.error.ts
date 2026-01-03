export interface OperationNotPermittedError extends Error {
  readonly operation: string;
  readonly reason: string;
}
