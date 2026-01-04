export interface ExternalDependencyFailureError extends Error {
  readonly externalDependencyName: string;
}
