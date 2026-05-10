import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@roppoh/shadcn/components/ui/sidebar";
import { NavLink } from "react-router";

import { sidebarContentList } from "./constant";

export function SidebarStaticContent() {
  return (
    <>
      {sidebarContentList.map((content) => (
        <SidebarGroup key={content.groupTitle}>
          <SidebarGroupLabel>{content.groupTitle}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {content.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.href}>
                    <SidebarMenuButton>
                      <item.icon />
                      {item.title}
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
