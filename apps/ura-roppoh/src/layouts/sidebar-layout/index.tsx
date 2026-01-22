import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@roppoh/shadcn/components/ui/sidebar";
import { Outlet } from "react-router";
import { Header } from "./components/header";
// import { ContentNavigation } from "./components/content-navigation";
// import { GuildSwitcher } from "./components/team-switcher";
import { UserNavigation } from "./components/user-navigation";

export default function () {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <Header />
        </SidebarHeader>
        <SidebarContent>{/* TODO: Content */}</SidebarContent>
        <SidebarFooter>
          <UserNavigation />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
