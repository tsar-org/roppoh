import { useEffect } from "react";
import { createRoutesStub } from "react-router";
import { Theme } from "remix-themes";
import { describe, expect } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import SidebarLayout from "@/layouts/sidebar-layout/layout";
import Root, { type loader as rootLoader } from "@/root";
import { useSidebar } from "@/shadcn/components/ui/sidebar";
import { testWithMswMock } from "../../helpers/test-with-msw-mock";
import { setDesktopViewPort } from "../../helpers/view-port";
import { worker } from "./msw.handlers";

function ControlSidebarState() {
  const { isMobile, setOpenMobile, setOpen } = useSidebar();

  useEffect(() => {
    if (isMobile) setOpenMobile(true);
    if (!isMobile) setOpen(true);
  }, [isMobile, setOpenMobile, setOpen]);

  return null;
}

describe("VRT sidebar-layout", async () => {
  const PATH = "/";
  const routeChildren: Parameters<typeof createRoutesStub>[0] = [
    {
      Component: SidebarLayout,
      children: [
        {
          Component: ControlSidebarState,
          path: PATH,
        },
      ],
    },
  ];

  testWithMswMock(worker)("desktop dark", async () => {
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
    await expect(screen.container).toMatchScreenshot();
  });

  testWithMswMock(worker)("desktop light", async () => {
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
    await expect(screen.container).toMatchScreenshot();
  });
});
