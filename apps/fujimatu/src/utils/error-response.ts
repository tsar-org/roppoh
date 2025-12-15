import type { Context } from "hono";

type OidcErrorCode =
  | "invalid_request"
  | "invalid_client"
  | "invalid_grant"
  | "unauthorized_client"
  | "unsupported_grant_type"
  | "invalid_token"
  | "server_error"
  | "unsupported_response_type"
  | "email_not_verified"
  | "invalid_state";

interface OidcErrorResponse {
  error: OidcErrorCode;
  error_description?: string;
}

export const oidcError = (
  c: Context,
  error: OidcErrorCode,
  description?: string,
  statusCode: 400 | 401 | 403 | 500 = 400,
) => {
  const response: OidcErrorResponse = { error };
  if (description) {
    response.error_description = description;
  }
  return c.json(response, statusCode);
};

export const invalidRequest = (c: Context, description: string) =>
  oidcError(c, "invalid_request", description, 400);

export const invalidClient = (c: Context, description: string) =>
  oidcError(c, "invalid_client", description, 401);

export const invalidGrant = (c: Context, description: string) =>
  oidcError(c, "invalid_grant", description, 400);

export const invalidToken = (c: Context, description?: string) =>
  oidcError(c, "invalid_token", description, 401);

export const serverError = (c: Context, description?: string) =>
  oidcError(c, "server_error", description, 500);

export const unsupportedGrantType = (c: Context, description: string) =>
  oidcError(c, "unsupported_grant_type", description, 400);

export const emailNotVerified = (c: Context, description: string) =>
  oidcError(c, "email_not_verified", description, 400);

export const invalidState = (c: Context, description: string) =>
  oidcError(c, "invalid_state", description, 400);
