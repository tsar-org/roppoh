import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // api
  route("/action/set-theme", "apis/theme.ts"),
  route("/api/auth/*", "apis/auth.ts"),

  // pages
  route("/login", "./pages/login/page.tsx"),

  // auth required pages
  layout("./layouts/AuthenticatedLayout/layout.tsx", [
    layout("./layouts/GuildAuthorizedLayout/layout.tsx", [
      layout("./layouts/SidebarLayout/layout.tsx", [index("./pages/index/page.tsx")]),
      route("/unity-sports-resort", "./pages/unity-sports-resort/page.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
