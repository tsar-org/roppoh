type ExternalContractType = "response-schema";

export interface ExternalContractViolationError extends Error {
  readonly externalDependencyName: string;
  readonly contract: ExternalContractType;
  readonly response: Response;
}
