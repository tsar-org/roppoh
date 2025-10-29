import { dehydrate } from "@tanstack/react-query";
import type { createRoutesStub } from "react-router";
import { Theme } from "remix-themes";
import { describe, expect } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import { newDokployClient } from "@/libs/dokploy-sdk/dokploy";
import { newServerSideReactQueryClient } from "@/libs/react-query/client.server";
import { projectAllQueryOption } from "@/libs/react-query/options/dokploy/project";
import IndexPage, { type loader } from "@/pages/index/page";
import { VRT_ENV } from "../../constant";
import { createLayoutRouteStub } from "../../helpers/layout-route-stub";
import { SidebarForTest } from "../../helpers/sidebar-for-test";
import { testWithMswMock } from "../../helpers/test-with-msw-mock";
import { setDesktopViewPort, setMobileViewPort } from "../../helpers/view-port";
import { worker } from "./msw.handlers";

describe("VRT index page", async () => {
  const PATH = "/";
  const createRouteChildren = (
    theme: Theme,
  ): Parameters<typeof createRoutesStub>[0] => [
    {
      Component: SidebarForTest,
      children: [
        {
          Component: IndexPage,
          loader: async (): ReturnType<typeof loader> => {
            const client = newServerSideReactQueryClient();
            const dokployClient = newDokployClient();
            const queryOption = projectAllQueryOption({
              dokployClient: dokployClient,
            });
            await client.prefetchQuery(queryOption);
            return {
              baseUrl: VRT_ENV.VITE_BASE_URL,
              dehydratedState: dehydrate(client),
              theme: theme,
            };
          },
          path: PATH,
        },
      ],
    },
  ];

  testWithMswMock(worker)("desktop dark", async () => {
    // Arrange
    await setDesktopViewPort(page);
    const routeChildren = createRouteChildren(Theme.DARK);
    const Stub = createLayoutRouteStub(routeChildren, Theme.DARK);

    // Act
    const screen = render(<Stub initialEntries={[PATH]} />);

    // Assert
    await expect(screen.container).toMatchScreenshot("desktop-dark");
  });

  testWithMswMock(worker)("desktop light", async () => {
    // Arrange
    await setDesktopViewPort(page);
    const routeChildren = createRouteChildren(Theme.DARK);
    const Stub = createLayoutRouteStub(routeChildren, Theme.LIGHT);

    // Act
    const screen = render(<Stub initialEntries={[PATH]} />);

    // Assert
    await expect(screen.container).toMatchScreenshot("desktop-light");
  });

  testWithMswMock(worker)("mobile dark", async () => {
    // Arrange
    await setMobileViewPort(page);
    const routeChildren = createRouteChildren(Theme.DARK);
    const Stub = createLayoutRouteStub(routeChildren, Theme.DARK);

    // Act
    const screen = render(<Stub initialEntries={[PATH]} />);

    // Assert
    await expect(screen.container).toMatchScreenshot("mobile-dark");
  });

  testWithMswMock(worker)("mobile light", async () => {
    // Arrange
    await setMobileViewPort(page);
    const routeChildren = createRouteChildren(Theme.DARK);
    const Stub = createLayoutRouteStub(routeChildren, Theme.LIGHT);

    // Act
    const screen = render(<Stub initialEntries={[PATH]} />);

    // Assert
    await expect(screen.container).toMatchScreenshot("mobile-light");
  });
});
