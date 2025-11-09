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
  route("/api/set-lang/:lang", "apis/set-lang.ts"),

  // lang handler wraps all other routes
  layout("./layouts/i18n-provider/layout.tsx", [
    layout("./layouts/client-side-root/layout.tsx", [
      // pages
      route("/:lang/login", "./pages/login/page.tsx"),

      // auth required pages
      layout("./layouts/authenticated-layout/layout.tsx", [
        layout("./layouts/guild-authorized-layout/layout.tsx", [
          layout("./layouts/sidebar-layout/layout.tsx", [
            route("/:lang", "./pages/index/page.tsx"),
          ]),
          route(
            "/:lang/unity-sports-resort",
            "./pages/unity-sports-resort/page.tsx",
          ),
        ]),
      ]),

      // 404 not found page
      route("/:lang/*", "./pages/404/page.tsx"),
    ]),
  ]),

  // legacy URL (un-support i18n))
  index("./apis/redirect-to-i18n-url.ts"),

  route("/404", "./pages/404/page.tsx", { id: "404" }),
  route("*", "./pages/404/page.tsx", { id: "fallback" }),
] satisfies RouteConfig;
