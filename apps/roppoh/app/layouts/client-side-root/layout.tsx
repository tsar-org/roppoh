import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { useHtmlTagLangAttribute } from "./hooks/use-html-tag-lang-attribute";
import { useMetaThemeColorSync } from "./hooks/use-meta-theme-color-sync";
import { useSwUpdatePrompt } from "./hooks/use-sw-update-prompt";
import { useUserLangCookie } from "./hooks/use-user-lang-cookie";

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
  const {} = useMetaThemeColorSync();
  const {} = useHtmlTagLangAttribute();
  const {} = useUserLangCookie();

  return <Outlet />;
}
