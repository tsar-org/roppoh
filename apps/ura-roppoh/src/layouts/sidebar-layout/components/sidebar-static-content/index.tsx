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
      {sidebarContentList.map((item) => (
        <SidebarGroup key={item.groupTitle}>
          <SidebarGroupLabel>{item.groupTitle}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {item.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <item.icon />
                    <NavLink to={item.href}>{item.title}</NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
