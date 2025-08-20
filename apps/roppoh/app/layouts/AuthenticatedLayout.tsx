import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/AuthenticatedLayout";

export async function loader({ request: req, context: ctx }: Route.LoaderArgs) {
  try {
    const session = await ctx.dep.betterAuth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return redirect("/login");
    }

    return;
  } catch (error) {
    ctx.dep.logger.error(error, "Failed to get session");
    throw error;
  }
}

/**
 * 認証（Session)が有効であることを保証するLayout
 */
export default function AuthenticatedLayout() {
  return <Outlet />;
}
