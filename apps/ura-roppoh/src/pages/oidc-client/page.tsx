import { Button } from "@roppoh/shadcn/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@roppoh/shadcn/components/ui/input-group";
import { ItemGroup } from "@roppoh/shadcn/components/ui/item";
import { Skeleton } from "@roppoh/shadcn/components/ui/skeleton";
import { SsgoiTransition } from "@ssgoi/react";
import { Search } from "lucide-react";
import { useQueryStates } from "nuqs";
import { lazy, Suspense } from "react";

import { SiteHeader } from "@/components/header";
import { useOidcClients } from "@/hooks/better-auth";

import { OidcClient } from "./components/oidc-client";
import { dialogSearchParams } from "./params";

const CreateClientDialog = lazy(() =>
  import("./components/create-dialog").then((m) => ({ default: m.CreateClientDialog })),
);
const UpdateClientDialog = lazy(() =>
  import("./components/update-dialog").then((m) => ({ default: m.UpdateDialog })),
);
const DeleteClientDialog = lazy(() =>
  import("./components/delete-dialog").then((m) => ({ default: m.DeleteClientDialog })),
);

export default function () {
  const { data, isPending } = useOidcClients();
  const [{ dialog, client_id }, setParams] = useQueryStates(dialogSearchParams);

  return (
    <SsgoiTransition id="/oidc-client">
      <SiteHeader title={"OIDC client"} />
      <div className="p-6">
        <div className="flex items-center justify-between gap-3 pb-4">
          <InputGroup className="max-w-sm">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search holdings or tickers..." />
          </InputGroup>
          <Button
            variant="outline"
            size="lg"
            onClick={() => void setParams({ dialog: "create", client_id: null })}
          >
            New Client
          </Button>
        </div>
        <ItemGroup>
          {isPending ? (
            <Skeleton className="h-16 w-full" />
          ) : (
            data?.map((client) => <OidcClient key={client.client_id} client={client} />)
          )}
        </ItemGroup>

        {/* dialog */}
        {dialog === "create" && (
          <Suspense fallback={null}>
            <CreateClientDialog />
          </Suspense>
        )}
        {dialog === "edit" && client_id && (
          <Suspense fallback={null}>
            <UpdateClientDialog />
          </Suspense>
        )}
        {dialog === "delete" && client_id && (
          <Suspense fallback={null}>
            <DeleteClientDialog />
          </Suspense>
        )}
      </div>
    </SsgoiTransition>
  );
}
