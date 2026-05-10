import type { JSX } from "react";

import { Building, Key, Users } from "lucide-react";

interface SidebarContent {
  groupTitle: string;
  items: {
    icon: () => JSX.Element;
    title: string;
    href: string;
  }[];
}

export const sidebarContentList = [
  {
    groupTitle: "Management",
    items: [
      {
        href: "/oidc-client",
        icon: () => <Key />,
        title: "OIDC client",
      },
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
] as const satisfies SidebarContent[];
