import { Gamepad } from "lucide-react";
import { useI18nContext } from "@/i18n/i18n-react";
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

export const ContentNavigation = () => {
  const { LL } = useI18nContext();

  const playground: CollapsibleSidebarContent = {
    icon: () => <Gamepad />,
    isDefaultOpen: true,
    items: [
      {
        title: "Unity Sports Resort",
        url: "/unity-sports-resort",
      },
    ],
    title: LL.sidebar.content.playground(),
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{LL.sidebar.content.items()}</SidebarGroupLabel>
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
