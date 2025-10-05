import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  ClientOnly,
  createRootRoute,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { ThemeProvider } from "@/contexts/theme-provider";
// import { startInstance } from "@/start-instance";
import appCss from "../styles.css?url";

// const contextInitializationMiddleware = startInstance
//   .createMiddleware()
//   .server(({ next, context }) => {
//     return next({ context });
//   });

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  // export const Route = createRootRoute({
  head: () => ({
    links: [
      { href: appCss, rel: "stylesheet" },
      { href: "/manifest.webmanifest", rel: "manifest" },
    ],
    meta: [
      { charSet: "utf-8" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
      { title: "Roppoh" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <HeadContent />
      </head>
      <body className="h-dvh w-full">
        <ClientOnly>
          {/* FYI: https://ui.shadcn.com/docs/dark-mode/vite */}
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {children}
          </ThemeProvider>
        </ClientOnly>
        {/* <ReactQueryDevtools buttonPosition="bottom-left" /> */}
        <Scripts />
      </body>
    </html>
  );
}
