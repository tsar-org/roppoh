import type { JSX } from "react";
import { createBrowserRouter } from "react-router";

import { ErrorBoundary } from "./root/error-boundary";

export const router = createBrowserRouter([
  {
    children: [
      {
        children: [
          {
            children: [
              {
                index: true,
                lazy: {
                  Component: async () => (await import("./pages/index/page")).default,
                },
              },
              {
                lazy: {
                  Component: async () => (await import("./pages/organization/page")).default,
                },
                path: "/organization",
              },
              {
                lazy: {
                  Component: async () => (await import("./pages/user/page")).default,
                },
                path: "/user",
              },
              {
                lazy: {
                  Component: async () => (await import("./pages/oidc-client/page")).default,
                },
                path: "/oidc-client",
              },
            ],
            lazy: {
              Component: async () => (await import("./layouts/sidebar-layout")).default,
            },
          },
        ],
        lazy: {
          Component: async () =>
            (await import("./layouts/authenticated-layout")).default as () => JSX.Element,
        },
      },
      {
        lazy: {
          Component: async () => (await import("./pages/login/page")).default,
        },
        path: "/login",
      },
      {
        lazy: {
          Component: async () => (await import("./pages/callback/page")).default,
        },
        path: "/callback",
      },
      {
        lazy: {
          Component: async () => (await import("./pages/consent/page")).default,
        },
        path: "/consent",
      },
    ],
    ErrorBoundary: ErrorBoundary,
    lazy: {
      Component: async () => (await import("./root")).Root,
    },
  },
]);
