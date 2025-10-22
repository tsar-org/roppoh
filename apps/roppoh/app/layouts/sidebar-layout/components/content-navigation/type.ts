import type { JSX } from "react";

export interface SidebarContent {
  title: string;
  url: string;
}

export interface CollapsibleSidebarContent {
  icon: () => JSX.Element;
  isDefaultOpen: boolean;
  items: Array<SidebarContent>;
  title: string;
}
