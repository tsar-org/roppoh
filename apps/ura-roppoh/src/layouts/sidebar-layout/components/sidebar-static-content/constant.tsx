import { Building, Users } from "lucide-react";
import type { JSX } from "react";

interface SidebarContent {
  groupTitle: string;
  items: Array<{
    icon: () => JSX.Element;
    title: string;
    href: string;
  }>;
}

export const sidebarContentList = [
  {
    groupTitle: "Management",
    items: [
      {
        href: "/organization",
        icon: () => <Building />,
        title: "Organization",
      },
      {
        href: "/user",
        icon: () => <Users />,
        title: "User",
      },
    ],
  },
] as const satisfies Array<SidebarContent>;
