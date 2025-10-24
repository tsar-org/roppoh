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
import { Toaster } from "@/shadcn/components/ui/sonner";

export const links: LinksFunction = () => [
  { href: "/manifest.webmanifest", rel: "manifest" },
];

export const meta: MetaFunction = () => {
  const siteName = "Roppoh";
  const title = "Roppoh";
  const description =
    "Roppoh — The game server management web application. And Play WebGL games right in your browser";
  const baseUrl = process.env.VITE_BASE_URL || "";
  const imageUrl = `${baseUrl}/api/og/${"Root"}`;

  return [
    { title: title },
    { content: description, name: "description" },
    { content: siteName, property: "og:site_name" },
    { content: baseUrl, property: "og:url" },
    { content: "website", property: "og:type" },
    { content: title, property: "og:title" },
    { content: description, property: "og:description" },
    { content: imageUrl, property: "og:image" },
    { content: "1200", property: "og:image:width" },
    { content: "630", property: "og:image:height" },
    { content: "image/png", property: "og:image:type" },
    { content: "summary_large_image", name: "twitter:card" },
  ];
};

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
