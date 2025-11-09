import { Outlet } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@/shadcn/components/ui/sidebar";
import { ContentNavigation } from "./components/content-navigation";
import { GuildSwitcher } from "./components/team-switcher";
import { UserNavigation } from "./components/user-navigation";

export default function () {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <GuildSwitcher />
        </SidebarHeader>
        <SidebarContent>
          <ContentNavigation />
        </SidebarContent>
        <SidebarFooter>
          <UserNavigation />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <main className="h-full w-full">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
