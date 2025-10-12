import {
  dehydrate,
  HydrationBoundary,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import { useLoaderData } from "react-router";
import { SiteHeader } from "@/components/header";
import PageTransition from "@/components/page-transition";
import { newDokployClient } from "@/libs/dokploy-sdk/dokploy";
import { getDokployClient } from "@/libs/dokploy-sdk/dokploy.client";
import { newServerSideReactQueryClient } from "@/libs/react-query/client.server";
import type { Route } from "./+types/page";
import { DataTable } from "./components/table";
import { ServerTableColumns } from "./components/table/columns";
import { UnitySportsResortCard } from "./components/unity-sports-resort-card";
import { useTableData } from "./hooks/use-tabel-data";
import {
  environmentByProjectIdQueryOption,
  projectAllQueryOption,
} from "./queries/project";

export async function loader({}: Route.LoaderArgs) {
  const client = newServerSideReactQueryClient();
  const dokployClient = newDokployClient();

  await client.prefetchQuery(projectAllQueryOption({ dokployClient }));

  return { dehydratedState: dehydrate(client) };
}

export default function () {
  const loaderData = useLoaderData<typeof loader>();
  const dokployClient = getDokployClient();
  const { data: projectList } = useQuery(
    projectAllQueryOption({ dokployClient }),
  );
  const environmentQueries = useQueries({
    queries: (projectList ?? []).map((project) =>
      environmentByProjectIdQueryOption({
        dokployClient: dokployClient,
        projectId: project.projectId,
      }),
    ),
  });
  const { tableData } = useTableData({ environmentQueries, projectList });

  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <PageTransition>
        <SiteHeader title="Servers" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* tile Layout */}
              <div className="grid @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 dark:*:data-[slot=card]:bg-card">
                <UnitySportsResortCard />
              </div>

              {/* server table */}
              <DataTable columns={ServerTableColumns} data={tableData} />
            </div>
          </div>
        </div>
      </PageTransition>
    </HydrationBoundary>
  );
}
