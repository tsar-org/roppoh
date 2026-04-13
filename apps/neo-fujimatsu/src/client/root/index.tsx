import { Toaster } from "@roppoh/shadcn/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { Outlet, ScrollRestoration } from "react-router";

import { useTheme, useThemeProvider } from "./components/theme-provider";

export function Root() {
  const queryClient = new QueryClient();
  // oxlint-disable-next-line no-empty-pattern
  const {} = useThemeProvider();

  return (
    <>
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </NuqsAdapter>
      <Toaster useTheme={useTheme} />
      <ScrollRestoration />
    </>
  );
}
