import { parseAsString } from "nuqs";

export const consentPageParams = {
  client_id: parseAsString,
  redirect_uri: parseAsString,
  scope: parseAsString,
} as const;
