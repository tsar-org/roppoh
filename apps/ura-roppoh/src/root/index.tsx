import { Toaster } from "@roppoh/shadcn/components/ui/sonner";
import { Ssgoi } from "@ssgoi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, ScrollRestoration } from "react-router";
import { config } from "@/libs/ssgoi";
import { useTheme, useThemeProvider } from "./components/theme-provider";

export function Root() {
  const queryClient = new QueryClient();
  const {} = useThemeProvider();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Ssgoi config={config}>
          <div style={{ minHeight: "100vh", position: "relative" }}>
            <Outlet />
          </div>
        </Ssgoi>
      </QueryClientProvider>
      <Toaster useTheme={useTheme} />
      <ScrollRestoration />
    </>
  );
}
