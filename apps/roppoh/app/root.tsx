import clsx from "clsx";
import type { LinksFunction } from "react-router";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import type { Route } from "./+types/root";
import { themeSessionResolver } from "./sessions.server";

import "./tailwind.css";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";

export const links: LinksFunction = () => [
  { href: "/manifest.webmanifest", rel: "manifest" },
];

// Return the theme from the session storage using the loader
export async function loader({ request }: Route.LoaderArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const queryClient = new QueryClient();

  return (
    <ThemeProvider specifiedTheme={data?.theme} themeAction="/action/set-theme">
      <QueryClientProvider client={queryClient}>
        <HtmlWrapper theme={data?.theme || undefined}>{children}</HtmlWrapper>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function HtmlWrapper({
  children,
  theme: ssrTheme,
}: {
  children: React.ReactNode;
  theme?: string;
}) {
  const [theme] = useTheme();
  return (
    <html className={clsx(theme)} lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(ssrTheme)} />
        <Links />
      </head>
      <body suppressHydrationWarning>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
