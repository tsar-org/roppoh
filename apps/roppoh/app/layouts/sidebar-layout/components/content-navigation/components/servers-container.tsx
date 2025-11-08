import { Server } from "lucide-react";
import { useServers } from "@/features/dokploy-server-management";
import { useI18nContext } from "@/i18n/i18n-react";
import { SidebarMenuSub } from "@/shadcn/components/ui/sidebar";
import { Skeleton } from "@/shadcn/components/ui/skeleton";
import { CollapsibleSidebarContentView } from "./collapsible-sidebar-content-view";
import { SidebarContentView } from "./sidebar-content-view";

export const ServersContainer = () => {
  const { servers } = useServers();
  const { LL } = useI18nContext();

  const header: Parameters<typeof CollapsibleSidebarContentView>[0]["header"] =
    {
      icon: () => <Server />,
      isDefaultOpen: true,
      title: LL.sidebar.content.servers(),
    };

  return (
    <CollapsibleSidebarContentView header={header}>
      <SidebarMenuSub>
        {servers.map((server) => {
          if (server.status === "fetching")
            return <Skeleton className="h-6 w-full" key={server.status} />;

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
