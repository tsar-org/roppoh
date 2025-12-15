import { Theme } from "remix-themes";
import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import NotFoundPage from "@/pages/404/page";
import { createLayoutRouteStub } from "../helpers/layout-route-stub";
import { setDesktopViewPort, setMobileViewPort } from "../helpers/view-port";

describe("VRT 404-not-found page", async () => {
  const PATH = "/404";
  const routeChildren = [{ Component: NotFoundPage, path: PATH }];

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
