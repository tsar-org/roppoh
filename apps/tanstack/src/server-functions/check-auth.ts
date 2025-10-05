import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

/**
 * Check Authentication
 *
 * - if dose not exist session, then redirect /login
 * - if failed to get session, then redirect /login
 */
export const checkAuth = createServerFn({ method: "GET" }).handler(
  async ({ context }) => {
    try {
      const headers = getRequest().headers;
      const session = await context.deps.betterAuth.api.getSession({ headers });
      if (!session) throw redirect({ to: "/login" });
    } catch (error) {
      console.error(error);
      context.deps.logger.error(error, "failed to check auth");
      throw redirect({ to: "/login" });
    }
  },
);
