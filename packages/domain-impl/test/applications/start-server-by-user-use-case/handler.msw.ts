import { ENV } from "@test/helpers/env";
import { HttpResponse, http } from "msw";

// compose.one handlers
export const composeOneStatus200Error = http.get(
  `${ENV.DOKPLOY_SERVER_URL}/api/compose.one`,
  ({ request }) => {
    const url = new URL(request.url);
    const composeId = url.searchParams.get("composeId");
    if (composeId !== "test-compose-id") {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }
    return HttpResponse.json({
      composeId: "test-compose-id",
      composeStatus: "error",
      description: "test-description",
      name: "test-name",
    });
  },
);

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
