import type { JSX } from "react";

interface SidebarContent {
  groupTitle: string;
  items: Array<{
    icon: () => JSX.Element;
    title: string;
    href: string;
  }>;
}

export const sidebarContentList: Array<SidebarContent> = [
  {
    groupTitle: "Management",
    items: [],
  },
];
