import type { OAuthClient } from "@better-auth/oauth-provider";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@roppoh/shadcn/components/ui/item";

import { DropDown } from "./components/dropdown";
import { ClientStatus } from "./components/status";

interface Props {
  client: OAuthClient;
}

export const OidcClient = ({ client }: Props) => {
  return (
    <Item variant="muted">
      <ItemContent>
        <ItemTitle>{client.client_id}</ItemTitle>
        <ItemDescription className="text-xs tracking-wider uppercase">
          name: {client.client_name ? client.client_name : "null"}
        </ItemDescription>
      </ItemContent>
      <div className="flex shrink-0 items-center gap-6">
        <ClientStatus disabled={client.disabled} />
        <DropDown client={client} />
      </div>
    </Item>
  );
};
