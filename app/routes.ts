// import type { RouteConfig } from "@react-router/dev/routes";
// import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";

// export default remixRoutesOptionAdapter((defineRoutes) => {
//   return defineRoutes((route) => {
//     route("/", "pages/index/page.tsx", { index: true });
//     route("/action/set-theme", "api/action.set-theme.ts");
//   });
// }) satisfies RouteConfig;

import {
  type RouteConfig,
  index,
  route,
  // layout,
  // prefix,
} from "@react-router/dev/routes";

export default [
  index("./pages/index/page.tsx"),

  // remix-theme
  route("/action/set-theme", "api/action.set-theme.ts"),

  // unity-sports-resort
  route("/unity-sports-resort", "./pages/unity-sports-resort/page.tsx"),
] satisfies RouteConfig;
