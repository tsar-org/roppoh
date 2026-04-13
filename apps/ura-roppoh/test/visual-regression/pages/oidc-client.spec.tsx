import type { OAuthClient } from "@better-auth/oauth-provider";
import { withNuqsTestingAdapter } from "nuqs/adapters/testing";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import SidebarLayout from "@/layouts/sidebar-layout";
import { authClient } from "@/libs/better-auth";
import Page from "@/pages/oidc-client/page";

import { textMatrix } from "../constant";
import { createRootRouteStub, type RouteChildren } from "../helpers/route-stub";
import { setTheme } from "../helpers/theme";
import { setViewPort } from "../helpers/view-port";

// NuqsTestingAdapter を使うため、react-router adapter を no-op に差し替える
vi.mock("nuqs/adapters/react-router/v7", () => ({
  NuqsAdapter: ({ children }: { children: ReactNode }) => children,
}));

vi.mock("@/libs/better-auth", () => ({
  authClient: {
    useSession: vi.fn().mockReturnValue({
      data: null,
      isPending: false,
      error: null,
    }),
    oauth2: {
      getClients: vi.fn(),
      getClient: vi.fn(),
    },
  },
}));

const PATH = "/oidc-client";
const routeChildren: RouteChildren = [
  {
    Component: SidebarLayout,
    children: [{ Component: Page, path: PATH }],
  },
];

const mockClients: OAuthClient[] = [
  {
    client_id: "client-1-id",
    client_name: "Test Client 1",
    disabled: false,
    redirect_uris: ["http://localhost:3000/callback"],
    client_secret: "secret-1",
  },
  {
    client_id: "client-2-id",
    client_name: undefined,
    disabled: true,
    redirect_uris: ["http://localhost:4000/callback"],
    client_secret: "secret-2",
  },
];

const mockClient: OAuthClient = {
  client_id: "client-1-id",
  client_name: "Test Client 1",
  disabled: false,
  redirect_uris: ["http://localhost:3000/callback"],
  client_secret: "secret-1",
};

describe("VRT oidc-client page - with clients data", async () => {
  beforeEach(() => {
    vi.mocked(authClient.oauth2.getClients).mockResolvedValue({
      data: mockClients,
      error: null,
    });
  });

  it.each(textMatrix)("$name", async ({ theme, device }) => {
    // Arrange
    await setViewPort({ page, type: device });
    setTheme({ theme });
    const Stub = createRootRouteStub({ routeChildren });

    // Act
    const { container } = await render(<Stub initialEntries={[PATH]} />, {
      wrapper: withNuqsTestingAdapter(),
    });

    // Assert
    await expect(container).toMatchScreenshot();
  });
});

describe("VRT oidc-client page - skeleton loading", async () => {
  beforeEach(() => {
    vi.mocked(authClient.oauth2.getClients).mockReturnValue(new Promise(() => {}));
  });

  it.each(textMatrix)("$name", async ({ theme, device }) => {
    // Arrange
    await setViewPort({ page, type: device });
    setTheme({ theme });
    const Stub = createRootRouteStub({ routeChildren });

    // Act
    const { container } = await render(<Stub initialEntries={[PATH]} />, {
      wrapper: withNuqsTestingAdapter(),
    });

    // Assert
    await expect(container).toMatchScreenshot();
  });
});

describe("VRT oidc-client page - create dialog", async () => {
  beforeEach(() => {
    vi.mocked(authClient.oauth2.getClients).mockResolvedValue({
      data: mockClients,
      error: null,
    });
  });

  it.each(textMatrix)("$name", async ({ theme, device }) => {
    // Arrange
    await setViewPort({ page, type: device });
    setTheme({ theme });
    const Stub = createRootRouteStub({ routeChildren });

    // Act
    const { container } = await render(<Stub initialEntries={[PATH]} />, {
      wrapper: withNuqsTestingAdapter({ searchParams: { dialog: "create" } }),
    });

    // Assert
    await expect(container).toMatchScreenshot();
  });
});

describe("VRT oidc-client page - update dialog - with client data", async () => {
  beforeEach(() => {
    vi.mocked(authClient.oauth2.getClients).mockResolvedValue({
      data: mockClients,
      error: null,
    });
    vi.mocked(authClient.oauth2.getClient).mockResolvedValue({
      data: mockClient,
      error: null,
    });
  });

  it.each(textMatrix)("$name", async ({ theme, device }) => {
    // Arrange
    await setViewPort({ page, type: device });
    setTheme({ theme });
    const Stub = createRootRouteStub({ routeChildren });

    // Act
    const { container } = await render(<Stub initialEntries={[PATH]} />, {
      wrapper: withNuqsTestingAdapter({
        searchParams: { dialog: "edit", client_id: "client-1-id" },
      }),
    });

    // Assert
    await expect(container).toMatchScreenshot();
  });
});

describe("VRT oidc-client page - update dialog - skeleton loading", async () => {
  beforeEach(() => {
    vi.mocked(authClient.oauth2.getClients).mockResolvedValue({
      data: mockClients,
      error: null,
    });
    vi.mocked(authClient.oauth2.getClient).mockReturnValue(new Promise(() => {}));
  });

  it.each(textMatrix)("$name", async ({ theme, device }) => {
    // Arrange
    await setViewPort({ page, type: device });
    setTheme({ theme });
    const Stub = createRootRouteStub({ routeChildren });

    // Act
    const { container } = await render(<Stub initialEntries={[PATH]} />, {
      wrapper: withNuqsTestingAdapter({
        searchParams: { dialog: "edit", client_id: "client-1-id" },
      }),
    });

    // Assert
    await expect(container).toMatchScreenshot();
  });
});

describe("VRT oidc-client page - delete dialog - with client data", async () => {
  beforeEach(() => {
    vi.mocked(authClient.oauth2.getClients).mockResolvedValue({
      data: mockClients,
      error: null,
    });
    vi.mocked(authClient.oauth2.getClient).mockResolvedValue({
      data: mockClient,
      error: null,
    });
  });

  it.each(textMatrix)("$name", async ({ theme, device }) => {
    // Arrange
    await setViewPort({ page, type: device });
    setTheme({ theme });
    const Stub = createRootRouteStub({ routeChildren });

    // Act
    const { container } = await render(<Stub initialEntries={[PATH]} />, {
      wrapper: withNuqsTestingAdapter({
        searchParams: { dialog: "delete", client_id: "client-1-id" },
      }),
    });

    // Assert
    await expect(container).toMatchScreenshot();
  });
});

describe("VRT oidc-client page - delete dialog - skeleton loading", async () => {
  beforeEach(() => {
    vi.mocked(authClient.oauth2.getClients).mockResolvedValue({
      data: mockClients,
      error: null,
    });
    vi.mocked(authClient.oauth2.getClient).mockReturnValue(new Promise(() => {}));
  });

  it.each(textMatrix)("$name", async ({ theme, device }) => {
    // Arrange
    await setViewPort({ page, type: device });
    setTheme({ theme });
    const Stub = createRootRouteStub({ routeChildren });

    // Act
    const { container } = await render(<Stub initialEntries={[PATH]} />, {
      wrapper: withNuqsTestingAdapter({
        searchParams: { dialog: "delete", client_id: "client-1-id" },
      }),
    });

    // Assert
    await expect(container).toMatchScreenshot();
  });
});
