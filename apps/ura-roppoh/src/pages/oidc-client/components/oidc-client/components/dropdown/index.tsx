import type { OAuthClient } from "@better-auth/oauth-provider";
import { Button } from "@roppoh/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@roppoh/shadcn/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";

import { DeleteClientDialog } from "./components/delete-dialog";
import { UpdateClientDialog } from "./components/update-dialog";

interface Props {
  client: OAuthClient;
}

export const DropDown = ({ client }: Props) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="secondary" size="lg" />}>
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setUpdateOpen(true)}>Update</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateClientDialog client={client} open={updateOpen} onOpenChange={setUpdateOpen} />
      <DeleteClientDialog client={client} open={deleteOpen} onOpenChange={setDeleteOpen} />
    </>
  );
};
