import { http, HttpResponse } from "msw";
import type { RequestHandler } from "msw";

const sessionHandler = http.get("*/get-session", () => {
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
});

export const handlersEmpty = [
  sessionHandler,
  http.get("*/passkey/list-user-passkeys", () => {
    return HttpResponse.json([]);
  }),
] satisfies RequestHandler[];

export const handlersWithPasskeys = [
  sessionHandler,
  http.get("*/passkey/list-user-passkeys", () => {
    return HttpResponse.json([
      {
        id: "passkey-1",
        name: "My MacBook",
        deviceType: "platform",
        backedUp: true,
        createdAt: "2024-01-01T00:00:00.000Z",
      },
    ]);
  }),
] satisfies RequestHandler[];
