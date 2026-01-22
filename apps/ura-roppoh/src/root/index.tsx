import { Toaster } from "@roppoh/shadcn/components/ui/sonner";
import { Ssgoi } from "@ssgoi/react";
import { Outlet, ScrollRestoration } from "react-router";
import { config } from "@/libs/ssgoi";
import { useTheme, useThemeProvider } from "./components/theme-provider";

export function Root() {
  const {} = useThemeProvider();

  return (
    <>
      <Ssgoi config={config}>
        <div style={{ minHeight: "100vh", position: "relative" }}>
          <Outlet />
        </div>
      </Ssgoi>
      <Toaster useTheme={useTheme} />
      <ScrollRestoration />
    </>
  );
}
