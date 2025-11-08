import { Spinner } from "@/shadcn/components/ui/spinner";
import { PageTransition } from "./page-transition";

export function Loading() {
  return (
    <PageTransition>
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    </PageTransition>
  );
}
