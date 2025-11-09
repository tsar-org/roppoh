import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { useLoaderData } from "react-router";
import { SiteHeader } from "@/components/header";
import { PageTransition } from "@/components/page-transition";
import { useServers } from "@/features/dokploy-server-management";
import { useI18nContext } from "@/i18n/i18n-react";
import { projectAllQueryOption } from "@/libs/react-query/options/dokploy/project";
import { generateBaseMeta } from "@/utils/base-meta-function";
import { themeSessionResolver } from "@/utils/sessions.server";
import type { Route } from "./+types/page";
import { DataTable } from "./components/table";
import { ServerTableColumns } from "./components/table/columns";
import { UnitySportsResortCard } from "./components/unity-sports-resort-card";

export const meta = ({ loaderData }: Route.MetaArgs) => [
  ...generateBaseMeta({
    baseUrl: loaderData.baseUrl,
    theme: loaderData.theme,
    title: "Home",
  }),
];

export async function loader({ request, context: ctx }: Route.LoaderArgs) {
  const { getTheme } = await themeSessionResolver(request);
  const queryOption = projectAllQueryOption({
    dokployClient: ctx.dep.dokployClient,
  });
  await ctx.dep.tanstackQueryClient.prefetchQuery(queryOption);

  return {
    baseUrl: ctx.cf.env.VITE_BASE_URL,
    dehydratedState: dehydrate(ctx.dep.tanstackQueryClient),
    theme: getTheme(),
  };
}

export default function () {
  const loaderData = useLoaderData<typeof loader>();
  const { servers } = useServers();
  const { LL } = useI18nContext();

  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <PageTransition>
        <SiteHeader title={LL.top.title()} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* tile Layout */}
              <div className="grid @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 dark:*:data-[slot=card]:bg-card">
                <UnitySportsResortCard />
              </div>

              {/* server table */}
              <DataTable columns={ServerTableColumns(LL)} data={servers} />
            </div>
          </div>
        </div>
      </PageTransition>
    </HydrationBoundary>
  );
}
