import { auth } from "@/lib/betterAuth/auth.server";
import { createLogger } from "@/lib/pino/logger.server";
import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/AuthenticatedLayout";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return redirect("/login");
    }

    return;
  } catch (error) {
    const logger = createLogger({
      moduleName: `${AuthenticatedLayout.name}.loader`,
    });
    logger.error(error, "Failed to get session");
    throw error;
  }
}

/**
 * 認証（Session)が有効であることを保証するLayout
 */
export default function AuthenticatedLayout() {
  return <Outlet />;
}
