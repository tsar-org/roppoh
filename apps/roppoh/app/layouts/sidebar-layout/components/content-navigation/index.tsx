import { Gamepad } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
} from "@/shadcn/components/ui/sidebar";
import { CollapsibleSidebarContentView } from "./components/collapsible-sidebar-content-view";
import { ServersContainer } from "./components/servers-container";
import { SidebarContentView } from "./components/sidebar-content-view";
import type { CollapsibleSidebarContent } from "./type";

const playground: CollapsibleSidebarContent = {
  icon: () => <Gamepad />,
  isDefaultOpen: true,
  items: [
    {
      title: "Unity Sports Resort",
      url: "/unity-sports-resort",
    },
  ],
  title: "Playground",
};

export const ContentNavigation = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Items</SidebarGroupLabel>
      <SidebarMenu>
        {/* playground */}
        <CollapsibleSidebarContentView header={playground}>
          <SidebarMenuSub>
            {playground.items.map((subItem) => (
              <SidebarContentView content={subItem} key={subItem.url} />
            ))}
          </SidebarMenuSub>
        </CollapsibleSidebarContentView>

        {/* Servers */}
        <ServersContainer />
      </SidebarMenu>
    </SidebarGroup>
  );
};
