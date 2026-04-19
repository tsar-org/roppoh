import { Button } from "@roppoh/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@roppoh/shadcn/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { useQueryStates } from "nuqs";

import { dialogSearchParams } from "@/client/pages/account/params";

interface Props {
  passkey: { id: string };
}

export const DropDown = (props: Props) => {
  const [, setParams] = useQueryStates(dialogSearchParams);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="secondary" size="lg" />}>
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => void setParams({ dialog: "delete", passkey_id: props.passkey.id })}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
