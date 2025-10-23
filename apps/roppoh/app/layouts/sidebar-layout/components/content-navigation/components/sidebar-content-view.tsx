import { Link } from "react-router";
import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shadcn/components/ui/sidebar";
import type { SidebarContent } from "../type";

type Props = {
  content: SidebarContent;
};

export const SidebarContentView = ({ content }: Props) => {
  return (
    <SidebarMenuSubItem key={content.title}>
      <SidebarMenuSubButton asChild>
        <Link to={content.url}>
          <span>{content.title}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
};
