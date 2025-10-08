import { Gamepad, Server } from "lucide-react";
import { Outlet } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/shadcn/components/ui/sidebar";
import type { Route } from "./+types/layout";
import { ContentNavigation } from "./components/ContentNavigation";
import { GuildSwitcher } from "./components/TeamSwitcher";
import { UserNavigation } from "./components/UserNavigation";

const data = {
  ContentNavigation: [
    {
      icon: Gamepad,
      isActive: true,
      items: [
        {
          title: "Unity Sports Resort",
          url: "/unity-sports-resort",
        },
      ],
      title: "Playground",
      url: "#",
    },
    {
      icon: Server,
      isActive: true,
      items: [
        {
          title: "Minecraft Server",
          url: "#",
        },
        {
          title: "Ark Server",
          url: "#",
        },
      ],
      title: "Servers",
      url: "#",
    },
  ],
};

export async function clientLoader({}: Route.ClientLoaderArgs) {}

export default function SidebarLayout() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <GuildSwitcher />
        </SidebarHeader>
        <SidebarContent>
          <ContentNavigation items={data.ContentNavigation} />
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
