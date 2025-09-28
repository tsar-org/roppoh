import { env } from "cloudflare:workers";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createBetterAuthInstance } from "@/libs/better-auth/auth.server";
import { createLogger } from "@/libs/pino/logger.server";

/**
 * Check Authentication
 *
 * - if dose not exist session, then redirect /login
 * - if failed to get session, then redirect /login
 */
export const checkAuth = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const request = getRequest();
    const headers = request.headers;
    const auth = createBetterAuthInstance({ env });
    const session = await auth.api.getSession({ headers });
    if (!session) throw redirect({ to: "/login" });
  } catch (error) {
    const logger = createLogger();
    logger.error(error, "failed to check auth: ");
    throw redirect({ to: "/login" });
  }
});
