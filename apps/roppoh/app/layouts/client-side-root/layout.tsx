import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { useSwUpdatePrompt } from "./hooks/use-sw-update-prompt";

// for client side render
export async function clientLoader({}: Route.ClientLoaderArgs) {}

/**
 * Client-side only root layout for React Router
 *
 * The root component is SSR'd, so client-only Providers and Contexts
 * cannot be added there. This layout provides a separate place to set up
 * client-only Providers and Contexts.
 */
export default function () {
  const {} = useSwUpdatePrompt();

  return <Outlet />;
}
