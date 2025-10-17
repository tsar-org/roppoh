import type { ErrorT, Issue } from "dokploy-sdk/models";

export class DokployError extends Error {
  public readonly code: string;
  public readonly issues: Array<Issue> | undefined;

  public constructor(error: ErrorT) {
    super();
    this.message = error.message;
    this.code = error.code;
    this.issues = error.issues;
  }
}

// biome-ignore lint/suspicious/noExplicitAny: Required for type guard to accept any input
export const isDokployError = (response: any): response is ErrorT => {
  return (
    typeof response === "object" &&
    response !== null &&
    "code" in response &&
    "message" in response &&
    typeof response.code === "string" &&
    typeof response.message === "string"
  );
};
