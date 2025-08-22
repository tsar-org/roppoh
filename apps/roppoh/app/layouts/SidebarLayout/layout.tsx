import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Gamepad, Server } from "lucide-react";
import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { ContentNavigation } from "./components/ContentNavigation";
import { UserNavigation } from "./components/UserNavigation";
import { GuildSwitcher } from "./components/ui/TeamSwitcher";

const data = {
  ContentNavigation: [
    {
      title: "Playground",
      url: "#",
      icon: Gamepad,
      isActive: true,
      items: [
        {
          title: "Unity Sports Resort",
          url: "/unity-sports-resort",
        },
      ],
    },
    {
      title: "Servers",
      url: "#",
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
    },
  ],
};

export async function clientLoader({ request }: Route.ClientLoaderArgs) {}

export default function SidebarLayout() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
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
      <main className="h-full w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
