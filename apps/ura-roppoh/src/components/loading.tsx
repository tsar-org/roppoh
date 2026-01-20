import { Spinner } from "@roppoh/shadcn/components/ui/spinner";

export function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
}
