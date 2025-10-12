import { Outlet } from "react-router";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/shadcn/components/ui/sidebar";

export const SidebarForTest = () => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="inset"></Sidebar>
      <SidebarInset>
        <main className="h-full w-full">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
