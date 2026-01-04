export interface ResourceNotFoundError extends Error {
  readonly resourceType: string;
  readonly resourceId: string;
}
