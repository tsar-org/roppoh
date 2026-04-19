import { Badge } from "@roppoh/shadcn/components/ui/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@roppoh/shadcn/components/ui/item";
import { Fingerprint } from "lucide-react";

import { DropDown } from "./components/dropdown";

interface Passkey {
  id: string;
  name?: string | null | undefined;
  deviceType?: string | null | undefined;
  backedUp?: boolean | null | undefined;
  createdAt?: Date | string | null | undefined;
}

interface Props {
  passkey: Passkey;
}

export const PasskeyItem = (props: Props) => {
  const createdAt = props.passkey.createdAt ? new Date(props.passkey.createdAt) : null;

  return (
    <Item variant="muted">
      <ItemMedia>
        <Fingerprint className="size-5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{props.passkey.name || "Unnamed passkey"}</ItemTitle>
        <ItemDescription className="text-xs tracking-wider">
          {props.passkey.deviceType ? `${props.passkey.deviceType} device` : "unknown device"}
          {createdAt ? ` · added ${createdAt.toLocaleDateString()}` : ""}
        </ItemDescription>
      </ItemContent>
      <ItemActions className="flex shrink-0 items-center gap-3">
        {props.passkey.backedUp ? <Badge variant="secondary">Synced</Badge> : null}
        <DropDown passkey={props.passkey} />
      </ItemActions>
    </Item>
  );
};
