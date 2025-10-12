import { createRoutesStub } from "react-router";
import { Theme } from "remix-themes";
import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import IndexPage, { type loader } from "@/pages/index/page";
import Root, { type loader as rootLoader } from "@/root";
import { SidebarForTest } from "../helpers/sidebar-for-test";
import { setDesktopViewPort, setMobileViewPort } from "../helpers/view-port";

describe("VRT index page", async () => {
  const PATH = "/";
  const routeChildren: Parameters<typeof createRoutesStub>[0] = [
    {
      Component: SidebarForTest,
      children: [
        {
          Component: IndexPage,
          loader: async (): ReturnType<typeof loader> => ({
            dehydratedState: { mutations: [], queries: [] },
          }),
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
  }, 30000);

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
