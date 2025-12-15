import { vValidator } from "@hono/valibot-validator";
import type { ValidationTargets } from "hono/types";
import type { GenericSchema, GenericSchemaAsync } from "valibot";
import { oidcError } from "./error-response";

export const oidcValidator = <
  T extends GenericSchema | GenericSchemaAsync,
  Target extends keyof ValidationTargets,
>(
  target: Target,
  schema: T,
) =>
  vValidator(target, schema, (result, c) => {
    if (result.success === false) {
      const firstIssue = result.issues[0];
      return oidcError(c, "invalid_request", firstIssue?.message, 400);
    }
    return;
  });
