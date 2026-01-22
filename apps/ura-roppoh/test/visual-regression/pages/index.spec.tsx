import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import SidebarLayout from "@/layouts/sidebar-layout";
import Page from "@/pages/index/page";
import { textMatrix } from "../constant";
import { createRootRouteStub, type RouteChildren } from "../helpers/route-stub";
import { setTheme } from "../helpers/theme";
import { setViewPort } from "../helpers/view-port";

describe("VRT index page", async () => {
  const PATH = "/";
  const routeChildren: RouteChildren = [
    {
      Component: SidebarLayout,
      children: [{ Component: Page, path: PATH }],
    },
  ];

  it.each(textMatrix)("$name", async ({ theme, device }) => {
    // Arrange
    await setViewPort({ page, type: device });
    setTheme({ theme });
    const Stub = createRootRouteStub({ routeChildren });

    // Act
    const { container } = await render(<Stub initialEntries={[PATH]} />);

    // Assert
    await expect(container).toMatchScreenshot();
  });
});
