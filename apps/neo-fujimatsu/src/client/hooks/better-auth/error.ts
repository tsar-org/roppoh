interface RawMessage {
  readonly code: string;
  message: string;
}

interface BetterAuthErrorObject {
  code?: string | undefined;
  message?: string | RawMessage | undefined;
  status: number;
  statusText: string;
}

export const extractErrorMessage = (
  message: string | RawMessage | undefined,
): string | undefined => {
  if (message == null) return undefined;
  if (typeof message === "string") return message;
  return message.message;
};

export class BetterAuthError extends Error {
  public readonly code: string | undefined;
  public readonly status: number;
  public readonly statusText: string;

  public constructor(error: BetterAuthErrorObject) {
    super(extractErrorMessage(error.message));
    this.code = error.code;
    this.status = error.status;
    this.statusText = error.statusText;
  }
}
