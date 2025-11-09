import { Outlet, redirect } from "react-router";
import { navigatorDetector } from "typesafe-i18n/detectors";
import { detectLocale } from "@/i18n/i18n-util";
import type { Route } from "./+types/layout";

export async function loader({ request: req, context: ctx }: Route.LoaderArgs) {
  try {
    const session = await ctx.dep.betterAuth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      const detectedLocale = detectLocale(navigatorDetector);
      return redirect(`/${detectedLocale}/login`);
    }

    return;
  } catch (error) {
    ctx.dep.logger.error(error, "Failed to get session");
    return redirect("/en/login");
  }
}

/**
 * 認証（Session)が有効であることを保証するLayout
 */
export default function AuthenticatedLayout() {
  return <Outlet />;
}
