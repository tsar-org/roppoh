import { dehydrate } from "@tanstack/react-query";
import { createRoutesStub } from "react-router";
import { Theme } from "remix-themes";
import { describe, expect } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import { newDokployClient } from "@/libs/dokploy-sdk/dokploy";
import { newServerSideReactQueryClient } from "@/libs/react-query/client.server";
import IndexPage, { type loader } from "@/pages/index/page";
import { projectAllQueryOption } from "@/pages/index/queries/project";
import Root, { type loader as rootLoader } from "@/root";
import { SidebarForTest } from "../../helpers/sidebar-for-test";
import { test } from "../../helpers/test-extend";
import { setDesktopViewPort, setMobileViewPort } from "../../helpers/view-port";

describe("VRT index page", async () => {
  const PATH = "/";
  const routeChildren: Parameters<typeof createRoutesStub>[0] = [
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
            const _res = await dokployClient.project.getAll();
            return { dehydratedState: dehydrate(client) };
          },
          path: PATH,
        },
      ],
    },
  ];

  test("desktop dark", async () => {
    // Arrange
    await setDesktopViewPort(page);
    const Stub = createRoutesStub([
      {
        Component: Root,
        children: routeChildren,
        loader: async (): ReturnType<typeof rootLoader> => ({
          theme: Theme.DARK,
        }),
      },
    ]);

    // Act
    const screen = render(<Stub initialEntries={[PATH]} />);

    // Assert
    await expect(screen.container).toMatchScreenshot("desktop-dark");
  });

  test("desktop light", async () => {
    // Arrange
    await setDesktopViewPort(page);
    const Stub = createRoutesStub([
      {
        Component: Root,
        children: routeChildren,
        loader: async (): ReturnType<typeof rootLoader> => ({
          theme: Theme.LIGHT,
        }),
      },
    ]);

    // Act
    const screen = render(<Stub initialEntries={[PATH]} />);

    // Assert
    await expect(screen.container).toMatchScreenshot("desktop-light");
  });

  test("mobile dark", async () => {
    // Arrange
    await setMobileViewPort(page);
    const Stub = createRoutesStub([
      {
        Component: Root,
        children: routeChildren,
        loader: async (): ReturnType<typeof rootLoader> => ({
          theme: Theme.DARK,
        }),
      },
    ]);

    // Act
    const screen = render(<Stub initialEntries={[PATH]} />);

    // Assert
    await expect(screen.container).toMatchScreenshot("mobile-dark");
  });

  test("mobile light", async () => {
    // Arrange
    await setMobileViewPort(page);
    const Stub = createRoutesStub([
      {
        Component: Root,
        children: routeChildren,
        loader: async (): ReturnType<typeof rootLoader> => ({
          theme: Theme.LIGHT,
        }),
      },
    ]);

    // Act
    const screen = render(<Stub initialEntries={[PATH]} />);

    // Assert
    await expect(screen.container).toMatchScreenshot("mobile-light");
  });
});
