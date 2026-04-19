import type { JSX } from "react";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    children: [
      {
        path: "/sign-in",
        lazy: {
          Component: async () => (await import("./pages/sign-in/page")).default,
        },
      },
      {
        children: [],
        lazy: {
          Component: async () =>
            (await import("./layouts/authenticated-layout")).default as () => JSX.Element,
        },
      },
      {
        path: "/consent",
        lazy: {
          Component: async () => (await import("./pages/consent/page")).default,
        },
      },
      {
        path: "*",
        lazy: {
          Component: async () => (await import("./pages/404/page")).default,
        },
      },
    ],
    lazy: {
      Component: async () => (await import("./root")).Root,
    },
  },
]);
