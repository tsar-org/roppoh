import type { JSX } from "react";
import { createBrowserRouter } from "react-router";
import { ErrorBoundary } from "./root/error-boundary";
import { HydrateFallback } from "./root/hydrate-fallback";

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
                  Component: async () =>
                    (await import("./pages/index/page")).default,
                },
              },
            ],
            lazy: {
              Component: async () =>
                (await import("./layouts/sidebar-layout")).default,
            },
          },
        ],
        lazy: {
          Component: async () =>
            (await import("./layouts/authenticated-layout"))
              .default as () => JSX.Element,
        },
      },
      {
        lazy: {
          Component: async () => (await import("./pages/login/page")).default,
        },
        path: "/login",
      },
    ],
    ErrorBoundary: ErrorBoundary,
    HydrateFallback: HydrateFallback,
    lazy: {
      Component: async () => (await import("./root")).Root,
    },
  },
]);
