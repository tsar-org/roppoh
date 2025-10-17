import { Suspense } from "react";
import { Separator } from "@/shadcn/components/ui/separator";
import { SidebarTrigger } from "@/shadcn/components/ui/sidebar";
import { Skeleton } from "@/shadcn/components/ui/skeleton";

export function SiteHeader({ title }: { title: string }) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Suspense fallback={<Skeleton className="size-7" />}>
          <SidebarTrigger className="-ml-1" />
        </Suspense>
        <Separator
          className="mx-2 data-[orientation=vertical]:h-4"
          orientation="vertical"
        />
        <h1 className="py-4 font-medium text-base"> {title} </h1>
      </div>
    </header>
  );
}
