import { auth } from "@/lib/betterAuth/auth.server";
import { Outlet, redirect } from "react-router";
import type { Route } from "./+types/AuthenticatedLayout";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return redirect("/login");
  }

  return;
}

/**
 * 認証（Session)が有効であることを保証するLayout
 */
export default function AuthenticatedLayout() {
  return <Outlet />;
}
