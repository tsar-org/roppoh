import type { JSX } from "react";

interface SidebarContent {
  groupTitle: string;
  items: {
    icon: () => JSX.Element;
    title: string;
    href: string;
  }[];
}

export const sidebarContentList: SidebarContent[] = [
  {
    groupTitle: "Management",
    items: [],
  },
];
