import { Button } from "@roppoh/shadcn/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@roppoh/shadcn/components/ui/card";
import { ItemGroup } from "@roppoh/shadcn/components/ui/item";
import { Skeleton } from "@roppoh/shadcn/components/ui/skeleton";
import { Plus } from "lucide-react";
import { useQueryStates } from "nuqs";
import { lazy, Suspense } from "react";

import { useUserPasskeys } from "@/client/hooks/better-auth";

import { PasskeyItem } from "./components/passkey-item";
import { dialogSearchParams } from "./params";

const AddPasskeyDialog = lazy(() =>
  import("./components/add-passkey-dialog").then((m) => ({ default: m.AddPasskeyDialog })),
);
const DeletePasskeyDialog = lazy(() =>
  import("./components/delete-passkey-dialog").then((m) => ({ default: m.DeletePasskeyDialog })),
);

export default function () {
  const { data, isPending } = useUserPasskeys();
  const [{ dialog, passkey_id }, setParams] = useQueryStates(dialogSearchParams);

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Account</h1>

      <Card>
        <CardHeader>
          <CardTitle>Passkeys</CardTitle>
          <CardDescription>
            Sign in securely without a password using your device&apos;s biometrics or a security
            key.
          </CardDescription>
          <CardAction>
            <Button
              variant="outline"
              onClick={() => void setParams({ dialog: "add", passkey_id: null })}
            >
              <Plus />
              Add passkey
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ItemGroup>
            {isPending ? (
              <Skeleton className="h-16 w-full" />
            ) : data && data.length > 0 ? (
              data.map((entry) => <PasskeyItem key={entry.id} passkey={entry} />)
            ) : (
              <p className="text-sm text-muted-foreground">
                You have not registered any passkeys yet.
              </p>
            )}
          </ItemGroup>
        </CardContent>
      </Card>

      {dialog === "add" && (
        <Suspense fallback={null}>
          <AddPasskeyDialog />
        </Suspense>
      )}
      {dialog === "delete" && passkey_id && (
        <Suspense fallback={null}>
          <DeletePasskeyDialog />
        </Suspense>
      )}
    </div>
  );
}
