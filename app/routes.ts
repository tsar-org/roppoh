import type { RouteConfig } from "@react-router/dev/routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";

export default remixRoutesOptionAdapter((defineRoutes) => {
  return defineRoutes((route) => {
    route("/", "pages/index/page.tsx", { index: true });
    route("/action/set-theme", "api/action.set-theme.ts");
  });
}) satisfies RouteConfig;
