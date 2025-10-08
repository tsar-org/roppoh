import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import { SiteHeader } from "@/components/header";
import PageTransition from "@/components/page-transition";
import { ToggleThemeButton } from "@/components/toggle-theme-button";
import { TsarOrganizationLink } from "@/components/tsar-organization-link";
import { dokployClient } from "@/libs/dokploy-sdk/dokploy.client";
import { DataTable } from "./components/table";
import { columns, type Payment } from "./components/table/columns";
import { UnitySportsResortCard } from "./components/unity-sports-resort-card";

function getData(): Payment[] {
  // Fetch data from your API here.
  return [
    {
      amount: 100,
      email: "m@example.com",
      id: "728ed52f",
      status: "pending",
    },
    // ...
  ];
}

export default function () {
  const data = getData();
  // project.getall() -> compose.one
  // const { data: projectList } = useQuery({
  //   queryFn: () => dokployClient.project.getAll(),
  //   queryKey: ["project.getAll"],
  // });
  // const composeQueries = useQueries({
  //   queries: (projectList ?? []).map((project) => ({
  //     enabled: !!projectList, // projectListが取得できたら実行
  //     queryFn: () => dokployClient.compose.one(project.composeId),
  //     queryKey: ["compose", project.composeId],
  //   })),
  // });

  return (
    <PageTransition>
      <SiteHeader title="Servers" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
              <UnitySportsResortCard />
            </div>
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
