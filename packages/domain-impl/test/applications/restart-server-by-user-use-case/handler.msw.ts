import { ENV } from "@test/helpers/env";
import { HttpResponse, http } from "msw";

// compose.one handlers
export const composeOneStatus404 = http.get(
  `${ENV.DOKPLOY_SERVER_URL}/api/compose.one`,
  () => HttpResponse.json({ message: "Not Found" }, { status: 404 }),
);

export const composeOneStatus500 = http.get(
  `${ENV.DOKPLOY_SERVER_URL}/api/compose.one`,
  () =>
    HttpResponse.json({ message: "Internal Server Error" }, { status: 500 }),
);

export const composeOneInvalidResponse = http.get(
  `${ENV.DOKPLOY_SERVER_URL}/api/compose.one`,
  () => HttpResponse.json("invalid-response"),
);
