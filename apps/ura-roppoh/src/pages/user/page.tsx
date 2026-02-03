import { Skeleton } from "@roppoh/shadcn/components/ui/skeleton";
import { SsgoiTransition } from "@ssgoi/react";
import { SiteHeader } from "@/components/header";

export default function () {
  return (
    <SsgoiTransition id="/user">
      <SiteHeader title="User" />
      <div className="container mx-auto p-6">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </SsgoiTransition>
  );
}
