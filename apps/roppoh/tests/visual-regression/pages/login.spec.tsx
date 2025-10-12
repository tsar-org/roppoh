import { createRoutesStub } from "react-router";
import { Theme } from "remix-themes";
import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import LoginPage from "@/pages/login/page";
import Root, { type loader } from "@/root";
import { setDesktopViewPort, setMobileViewPort } from "../helpers/view-port";

describe("VRT login page", async () => {
  const PATH = "/login";
  const routeChildren = [{ Component: LoginPage, path: PATH }];

  test("desktop dark", async () => {
    // Arrange
    await setDesktopViewPort(page);
    const Stub = createRoutesStub([
      {
        Component: Root,
        children: routeChildren,
        loader: async (): ReturnType<typeof loader> => ({ theme: Theme.DARK }),
      },
    ]);

    // Act
    const screen = render(<Stub initialEntries={[PATH]} />);
    await document.fonts.ready;

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
        loader: async (): ReturnType<typeof loader> => ({ theme: Theme.LIGHT }),
      },
    ]);

    // Act
    const screen = render(<Stub initialEntries={[PATH]} />);
    await document.fonts.ready;

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
        loader: async (): ReturnType<typeof loader> => ({ theme: Theme.DARK }),
      },
    ]);

    // Act
    const screen = render(<Stub initialEntries={[PATH]} />);
    await document.fonts.ready;

    // Assert
    await expect(screen.container).toMatchScreenshot("mobile-dark");
  });

  test("mobile light", async () => {
    await setMobileViewPort(page);
    const Stub = createRoutesStub([
      {
        Component: Root,
        children: routeChildren,
        loader: async (): ReturnType<typeof loader> => ({ theme: Theme.LIGHT }),
      },
    ]);

    // Act
    const screen = render(<Stub initialEntries={[PATH]} />);
    await document.fonts.ready;

    // Assert
    await expect(screen.container).toMatchScreenshot("mobile-light");
  });
});
