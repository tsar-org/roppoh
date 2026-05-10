import type { RequestHandler } from "msw";

import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("*/get-session", () =>
    HttpResponse.json({
      session: {
        createdAt: "2024-01-01T00:00:00.000Z",
        expiresAt: "2099-01-01T00:00:00.000Z",
        id: "session-1",
        ipAddress: null,
        updatedAt: "2024-01-01T00:00:00.000Z",
        userAgent: null,
        userId: "user-1",
      },
      user: {
        createdAt: "2024-01-01T00:00:00.000Z",
        email: "test@example.com",
        emailVerified: true,
        id: "user-1",
        image: null,
        name: "Test User",
        updatedAt: "2024-01-01T00:00:00.000Z",
      },
    }),
  ),
  http.get("*/oauth2/get-client", () =>
    HttpResponse.json({
      client_id: "test-client-id",
      client_name: "Test Application",
    }),
  ),
] satisfies RequestHandler[];
