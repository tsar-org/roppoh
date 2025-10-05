import {
  getListServicesSuspenseQueryOptions,
  healthcheck,
  listServices,
  version,
} from "@roppoh/coolify-client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getGlobalStartContext } from "@tanstack/react-start";
import { SiteHeader } from "@/components/header";
import { PageTransition } from "@/components/page-transition";
import { SidebarLayout } from "@/layouts/sidebar-layout";
import { dokploClient } from "@/libs/dokploy-sdk";

export const Route = createFileRoute("/server/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    // await context.queryClient.ensureQueryData(
    //   getListServicesSuspenseQueryOptions(),
    // );

    const res = await dokploClient.organization.getAll();
    console.log(res);
  },
});

function RouteComponent() {
  // const listServicesQuery = useSuspenseQuery(
  //   getListServicesSuspenseQueryOptions(),
  // );
  // console.log("coolify: ", listServicesQuery.data);
  return (
    <PageTransition>
      <SidebarLayout>
        <SiteHeader title="Servers" />
        <div className="grid min-h-svh lg:grid-cols-2">aaaaaa</div>
      </SidebarLayout>
    </PageTransition>
  );
}
