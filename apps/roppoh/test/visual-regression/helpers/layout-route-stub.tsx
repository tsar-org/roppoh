import { createRoutesStub, Outlet } from "react-router";
import type { Theme } from "remix-themes";
import TypesafeI18n from "@/i18n/i18n-react";
import { loadLocale } from "@/i18n/i18n-util.sync";
import { Layout, type loader } from "@/root";
import { VRT_ENV } from "../constant";

type RouteChild = Parameters<typeof createRoutesStub>[0][0]["children"];

export function createLayoutRouteStub(routeChildren: RouteChild, theme: Theme) {
  return createRoutesStub([
    {
      Component: () => (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        {
          Component: () => {
            loadLocale("en");

            return (
              <TypesafeI18n locale={"en"}>
                <Outlet />
              </TypesafeI18n>
            );
          },
          children: routeChildren,
        },
      ],
      loader: async (): ReturnType<typeof loader> => ({
        baseUrl: VRT_ENV.VITE_BASE_URL,
        theme: theme,
      }),
    },
  ]);
}
