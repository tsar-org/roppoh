import { Toaster } from "@roppoh/shadcn/components/ui/sonner";
import { Ssgoi } from "@ssgoi/react";
import { Outlet, ScrollRestoration } from "react-router";
import { config } from "@/libs/ssgoi";
import { ThemeProvider, useTheme } from "./contexts/theme";

export function Root() {
  return (
    <>
      <ThemeProvider>
        <Ssgoi config={config}>
          <div style={{ minHeight: "100vh", position: "relative" }}>
            <Outlet />
          </div>
        </Ssgoi>
        <Toaster useTheme={useTheme} />
      </ThemeProvider>
      <ScrollRestoration />
    </>
  );
}
