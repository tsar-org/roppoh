import { Theme } from "remix-themes";
import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import LoginPage from "@/pages/login/page";
import { createLayoutRouteStub } from "../helpers/layout-route-stub";
import { setDesktopViewPort, setMobileViewPort } from "../helpers/view-port";

describe("VRT login page", async () => {
  const PATH = "/login";
  const routeChildren = [{ Component: LoginPage, path: PATH }];

  test("desktop dark", async () => {
    // Arrange
    await setDesktopViewPort(page);
    const Stub = createLayoutRouteStub(routeChildren, Theme.DARK);

    // Act
    const screen = await render(<Stub initialEntries={[PATH]} />);

    // Assert
    await expect(screen.container).toMatchScreenshot("desktop-dark");
  });

  test("desktop light", async () => {
    // Arrange
    await setDesktopViewPort(page);
    const Stub = createLayoutRouteStub(routeChildren, Theme.LIGHT);

    // Act
    const screen = await render(<Stub initialEntries={[PATH]} />);

    // Assert
    await expect(screen.container).toMatchScreenshot("desktop-light");
  });

  test("mobile dark", async () => {
    // Arrange
    await setMobileViewPort(page);
    const Stub = createLayoutRouteStub(routeChildren, Theme.DARK);

    // Act
    const screen = await render(<Stub initialEntries={[PATH]} />);

    // Assert
    await expect(screen.container).toMatchScreenshot("mobile-dark");
  });

  test("mobile light", async () => {
    await setMobileViewPort(page);
    const Stub = createLayoutRouteStub(routeChildren, Theme.LIGHT);

    // Act
    const screen = await render(<Stub initialEntries={[PATH]} />);

    // Assert
    await expect(screen.container).toMatchScreenshot("mobile-light");
  });
});
