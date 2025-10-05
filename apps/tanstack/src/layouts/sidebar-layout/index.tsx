import { Gamepad, Server } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/shadcn/components/ui/sidebar";
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
          url: "/unity-sports-resort" as const,
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

export const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
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
        {children}
      </main>
    </SidebarProvider>
  );
};
