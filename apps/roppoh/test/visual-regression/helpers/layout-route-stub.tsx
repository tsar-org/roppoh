import { createRoutesStub, Outlet } from "react-router";
import type { Theme } from "remix-themes";
import { Layout, type loader } from "@/root";

type RouteChild = Parameters<typeof createRoutesStub>[0][0]["children"];

export function createLayoutRouteStub(routeChildren: RouteChild, theme: Theme) {
  return createRoutesStub([
    {
      Component: () => (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: routeChildren,
      loader: async (): ReturnType<typeof loader> => ({ theme }),
    },
  ]);
}
