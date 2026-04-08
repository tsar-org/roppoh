import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@roppoh/shadcn/components/ui/input-group";
import { Item, ItemContent, ItemGroup } from "@roppoh/shadcn/components/ui/item";
import { Skeleton } from "@roppoh/shadcn/components/ui/skeleton";
import { SsgoiTransition } from "@ssgoi/react";
import { Search } from "lucide-react";

import { SiteHeader } from "@/components/header";
import { useOidcClient } from "@/hooks/better-auth";

import { CreateClientDialog } from "./components/create-client-dialog";
import { OidcClient } from "./components/oidc-client";

export default function () {
  const { data, isPending } = useOidcClient();

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
          <CreateClientDialog />
        </div>
        <ItemGroup>
          {/* Skeleton */}
          {isPending &&
            Array.from({ length: 3 }).map((_, i) => (
              <Item key={i} variant="muted">
                <ItemContent>
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </ItemContent>
                <div className="flex shrink-0 items-center gap-6">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-9 w-9 rounded-md" />
                </div>
              </Item>
            ))}

          {/* OidcClient */}
          {data?.map((client) => (
            <OidcClient key={client.client_id} client={client} />
          ))}
        </ItemGroup>
      </div>
    </SsgoiTransition>
  );
}
