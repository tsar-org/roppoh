import { parseAsString, parseAsStringLiteral } from "nuqs";

export const dialogSearchParams = {
  dialog: parseAsStringLiteral(["create", "edit", "delete"]),
  client_id: parseAsString,
};
