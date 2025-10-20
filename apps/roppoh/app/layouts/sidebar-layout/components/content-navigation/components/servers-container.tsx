import { Server } from "lucide-react";
import { useServers } from "@/features/dokploy-server-management";
import { SidebarMenuSub } from "@/shadcn/components/ui/sidebar";
import { Skeleton } from "@/shadcn/components/ui/skeleton";
import { CollapsibleSidebarContentView } from "./collapsible-sidebar-content-view";
import { SidebarContentView } from "./sidebar-content-view";

const header: Parameters<typeof CollapsibleSidebarContentView>[0]["header"] = {
  icon: () => <Server />,
  isDefaultOpen: true,
  title: "Servers",
};

export const ServersContainer = () => {
  const { servers } = useServers();

  return (
    <CollapsibleSidebarContentView header={header}>
      <SidebarMenuSub>
        {servers.map((server) => {
          if (server.status === "fetching")
            return <Skeleton className="h-6 w-full" />;

          return (
            <SidebarContentView
              content={{
                title: server.compose.name,
                // TODO: server page
                url: `#`,
              }}
              key={server.compose.composeId}
            />
          );
        })}
      </SidebarMenuSub>
    </CollapsibleSidebarContentView>
  );
};
