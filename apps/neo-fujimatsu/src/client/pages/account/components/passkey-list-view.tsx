import { Skeleton } from "@roppoh/shadcn/components/ui/skeleton";

import type { useUserPasskeys } from "@/client/hooks/better-auth";

import { PasskeyItem } from "./passkey-item";

interface PasskeyListViewProps {
  isPending: boolean;
  data: ReturnType<typeof useUserPasskeys>["data"];
}

export const PasskeyListView = ({ isPending, data }: PasskeyListViewProps) => {
  if (isPending) {
    return <Skeleton className="h-16 w-full" />;
  }
  if (data && data.length > 0) {
    return data.map((entry) => <PasskeyItem key={entry.id} passkey={entry} />);
  }
  return <p className="text-sm text-muted-foreground">You have not registered any passkeys yet.</p>;
};
