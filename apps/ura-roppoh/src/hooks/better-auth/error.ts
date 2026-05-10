interface BetterAuthErrorObject {
  code?: string | undefined;
  message?: string | undefined;
  status: number;
  statusText: string;
}

export class BetterAuthError extends Error {
  public readonly code: string | undefined;
  public readonly status: number;
  public readonly statusText: string;

  public constructor(error: BetterAuthErrorObject) {
    super(error.message);
    this.name = "BetterAuthError";
    this.code = error.code;
    this.status = error.status;
    this.statusText = error.statusText;
  }
}

export class MissingQueryParameterError extends Error {
  public constructor(parameterName: string) {
    super(`Required query parameter '${parameterName}' is missing`);
    this.name = "MissingQueryParameterError";
  }
}
