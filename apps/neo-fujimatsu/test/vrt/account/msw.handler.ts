import type { RequestHandler } from "msw";

import { HttpResponse, http } from "msw";

const sessionHandler = http.get("*/get-session", () =>
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
);

export const handlersEmpty = [
  sessionHandler,
  http.get("*/passkey/list-user-passkeys", () => HttpResponse.json([])),
] satisfies RequestHandler[];

export const handlersWithPasskeys = [
  sessionHandler,
  http.get("*/passkey/list-user-passkeys", () =>
    HttpResponse.json([
      {
        backedUp: true,
        createdAt: "2024-01-01T00:00:00.000Z",
        deviceType: "platform",
        id: "passkey-1",
        name: "My MacBook",
      },
    ]),
  ),
] satisfies RequestHandler[];
