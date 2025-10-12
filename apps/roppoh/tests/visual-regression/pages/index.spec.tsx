import { createRoutesStub } from "react-router";
import { Theme } from "remix-themes";
import { describe, expect, test, vi } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import IndexPage, { type loader } from "@/pages/index/page";
import Root, { type loader as rootLoader } from "@/root";
import { SidebarForTest } from "../helpers/sidebar-for-test";
import { setDesktopViewPort, setMobileViewPort } from "../helpers/view-port";

// Mock better-auth
vi.mock("@/libs/betterAuth/auth.client", () => ({
  authClient: {
    signOut: vi.fn(),
    useSession: () => ({
      data: {
        session: {
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
          id: "test-session-id",
          userId: "test-user-id",
        },
        user: {
          email: "test@example.com",
          id: "test-user-id",
          image: "https://roppoh.tsar-bmb.org/icons/tsar-icon.png",
          name: "Test User",
        },
      },
      error: null,
      isPending: false,
    }),
  },
}));

// Mock dokploy client
vi.mock("@/libs/dokploy-sdk/dokploy.client", () => ({
  getDokployClient: () => ({
    project: {
      all: vi.fn().mockResolvedValue([]),
    },
  }),
}));

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

    // Wait for fonts or timeout after 5 seconds
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]);

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
        loader: async (): ReturnType<typeof rootLoader> => ({
          theme: Theme.DARK,
        }),
      },
    ]);

    // Act
    const screen = render(<Stub initialEntries={[PATH]} />);
    await document.fonts.ready;

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
    await document.fonts.ready;

    // Assert
    await expect(screen.container).toMatchScreenshot("mobile-light");
  });
});
