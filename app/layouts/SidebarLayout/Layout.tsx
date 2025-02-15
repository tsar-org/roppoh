import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { RESTGetAPIOAuth2CurrentAuthorizationResult } from "@discordjs/core/http-only";
import { Gamepad, Server } from "lucide-react";
import { Outlet, useOutletContext } from "react-router";
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

export default function SidebarLayout() {
  const authResult =
    useOutletContext<RESTGetAPIOAuth2CurrentAuthorizationResult>();
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
          {authResult.user && <UserNavigation user={authResult.user} />}
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
