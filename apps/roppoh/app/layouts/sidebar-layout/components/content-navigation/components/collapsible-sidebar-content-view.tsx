import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shadcn/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shadcn/components/ui/sidebar";
import type { CollapsibleSidebarContent } from "../type";

type Props = {
  header: Pick<CollapsibleSidebarContent, "icon" | "isDefaultOpen" | "title">;
  children: React.ReactNode;
};

export const CollapsibleSidebarContentView = ({ header, children }: Props) => {
  return (
    <Collapsible
      asChild
      className="group/collapsible"
      defaultOpen={header.isDefaultOpen}
      key={header.title}
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={header.title}>
            <header.icon />
            <span>{header.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>{children}</CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};
