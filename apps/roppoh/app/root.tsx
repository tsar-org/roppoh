import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import clsx from "clsx";
import { useState } from "react";
import type { LinksFunction, MetaFunction } from "react-router";
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
import {
  clientSideQueryConfig,
  persister,
} from "@/libs/react-query/client.client";
import { themeSessionResolver } from "@/sessions.server";
import type { Route } from "./+types/root";
import "./tailwind.css";
import { QueryClient } from "@tanstack/react-query";
import { baseMeta } from "@/libs/react-router/base-meta-function";
import { Toaster } from "@/shadcn/components/ui/sonner";

export const links: LinksFunction = () => [
  { href: "/manifest.webmanifest", rel: "manifest" },
];

export const meta: MetaFunction = () => [...baseMeta({ title: "Roppoh" })];

// Return the theme from the session storage using the loader
export async function loader({ request }: Route.LoaderArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

function HtmlWrapper({
  children,
  theme: ssrTheme,
}: {
  children: React.ReactNode;
  theme?: string;
}) {
  const [theme] = useTheme();
  const [queryClient] = useState(() => new QueryClient(clientSideQueryConfig));

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
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}
        >
          {children}
        </PersistQueryClientProvider>
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data?.theme} themeAction="/action/set-theme">
      <HtmlWrapper theme={data?.theme || undefined}>
        <Outlet />
      </HtmlWrapper>
    </ThemeProvider>
  );
}
