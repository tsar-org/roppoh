import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // api
  route("/action/set-theme", "apis/theme.ts"),
  route("/api/login", "apis/discord/login.ts"),
  route("/api/toke-exchange", "apis/discord/tokenExchange.ts"),

  // pages
  route("/login", "./pages/login/page.tsx"),

  // auth required pages
  layout("./layouts/AuthenticatedLayout.tsx", [
    layout("./layouts/SidebarLayout/Layout.tsx", [
      index("./pages/index/page.tsx"),
    ]),
    route("/unity-sports-resort", "./pages/unity-sports-resort/page.tsx"),
  ]),
] satisfies RouteConfig;
