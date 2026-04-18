import type { OAuthClient } from "@better-auth/oauth-provider";
import { Button } from "@roppoh/shadcn/components/ui/button";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@roppoh/shadcn/components/ui/item";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { DropDown } from "./components/dropdown";
import { ClientStatus } from "./components/status";

interface Props {
  client: Pick<OAuthClient, "client_id" | "client_name" | "disabled" | "client_secret">;
}

export const OidcClient = (props: Props) => {
  return (
    <Item variant="muted">
      <ItemContent>
        <ItemTitle>{props.client.client_id}</ItemTitle>
        <ItemDescription className="text-xs tracking-wider uppercase">
          name: {props.client.client_name ? props.client.client_name : "null"}
        </ItemDescription>
      </ItemContent>
      <div className="flex shrink-0 items-center gap-6">
        <ClientStatus disabled={props.client.disabled} />
        {props.client.client_secret && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => {
              navigator.clipboard.writeText(props.client.client_secret!);
              toast.success("Copied client secret");
            }}
          >
            <Copy />
          </Button>
        )}
        <DropDown client={props.client} />
      </div>
    </Item>
  );
};
