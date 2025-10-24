import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  // api
  route("/action/set-theme", "apis/theme.ts"),
  route("/api/auth/*", "apis/auth.ts"),
  route("/api/dokploy/*", "apis/dokploy.ts"),
  route("/api/og/:title", "apis/og/route.tsx"),

  // pages
  route("/login", "./pages/login/page.tsx"),

  // auth required pages
  layout("./layouts/authenticated-layout/layout.tsx", [
    layout("./layouts/guild-authorized-layout/layout.tsx", [
      layout("./layouts/sidebar-layout/layout.tsx", [
        index("./pages/index/page.tsx"),
      ]),
      route("/unity-sports-resort", "./pages/unity-sports-resort/page.tsx"),
    ]),
  ]),

  // 404 not found page
  route("*", "./pages/404/page.tsx"),
] satisfies RouteConfig;
