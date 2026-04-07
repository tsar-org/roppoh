import type { OAuthClient } from "@better-auth/oauth-provider";
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

vi.mock("@/libs/better-auth", () => ({
  authClient: {
    useSession: vi.fn().mockReturnValue({
      data: null,
      isPending: false,
      error: null,
    }),
    oauth2: {
      getClients: vi.fn(),
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
    const { container } = await render(<Stub initialEntries={[PATH]} />);

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
    const { container } = await render(<Stub initialEntries={[PATH]} />);

    // Assert
    await expect(container).toMatchScreenshot();
  });
});
