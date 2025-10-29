import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import clsx from "clsx";
import { useState } from "react";
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
  type Theme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import {
  clientSideQueryConfig,
  persister,
} from "@/libs/react-query/client.client";
import type { Route } from "./+types/root";
import "./tailwind.css";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/shadcn/components/ui/sonner";
import { generateBaseMeta } from "@/utils/base-meta-function";
import { themeSessionResolver } from "@/utils/sessions.server";

export const links: LinksFunction = () => [
  { href: "/manifest.webmanifest", rel: "manifest" },
];

export const meta = ({ loaderData }: Route.MetaArgs) => [
  ...generateBaseMeta({
    baseUrl: loaderData.baseUrl,
    theme: loaderData.theme,
    title: "Roppoh",
  }),
];

// Return the theme from the session storage using the loader
export async function loader({ request, context }: Route.LoaderArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    baseUrl: context.cf.env.VITE_BASE_URL,
    theme: getTheme(),
  };
}

export function Html({
  children,
  ssrTheme,
}: {
  children: React.ReactNode;
  ssrTheme: Theme | null;
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

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={data?.theme} themeAction="/action/set-theme">
      <Html ssrTheme={data.theme}>{children}</Html>
    </ThemeProvider>
  );
}

export default function App() {
  return <Outlet />;
}
