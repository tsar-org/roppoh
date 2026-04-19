import { parseAsString, parseAsStringLiteral } from "nuqs";

export const dialogSearchParams = {
  dialog: parseAsStringLiteral(["add", "delete"] as const),
  passkey_id: parseAsString,
};
