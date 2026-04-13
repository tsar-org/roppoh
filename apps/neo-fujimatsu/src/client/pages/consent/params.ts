import { parseAsString } from "nuqs";

export const consentPageParams = {
  scope: parseAsString,
  client_id: parseAsString,
  cancel_uri: parseAsString,
  redirect_uri: parseAsString,
} as const;
