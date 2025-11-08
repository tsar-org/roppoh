import { createRoutesStub, Outlet } from "react-router";
import type { Theme } from "remix-themes";
import { loadLocaleAsync } from "@/i18n/i18n-util.async";
import i18nProvider, {
  type loader as i18nProvideLoader,
} from "@/layouts/i18n-provider/layout";
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
          Component: i18nProvider,
          children: routeChildren,
          loader: async (): ReturnType<typeof i18nProvideLoader> => ({
            locale: "en",
          }),
        },
      ],
      loader: async (): ReturnType<typeof loader> => {
        await loadLocaleAsync("en");
        return {
          baseUrl: VRT_ENV.VITE_BASE_URL,
          theme,
        };
      },
    },
  ]);
}
