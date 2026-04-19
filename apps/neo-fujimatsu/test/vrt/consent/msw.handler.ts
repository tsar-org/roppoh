import { http, HttpResponse } from "msw";
import type { RequestHandler } from "msw";

export const handlers = [
  http.get("*/get-session", () => {
    return HttpResponse.json({
      user: {
        id: "user-1",
        name: "Test User",
        email: "test@example.com",
        emailVerified: true,
        image: null,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
      },
      session: {
        id: "session-1",
        userId: "user-1",
        expiresAt: "2099-01-01T00:00:00.000Z",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        ipAddress: null,
        userAgent: null,
      },
    });
  }),
  http.get("*/oauth2/get-client", () => {
    return HttpResponse.json({
      client_id: "test-client-id",
      client_name: "Test Application",
    });
  }),
] satisfies RequestHandler[];
