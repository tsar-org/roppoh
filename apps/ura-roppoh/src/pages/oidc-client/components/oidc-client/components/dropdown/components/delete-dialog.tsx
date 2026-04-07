import type { OAuthClient } from "@better-auth/oauth-provider";
import { Button } from "@roppoh/shadcn/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@roppoh/shadcn/components/ui/dialog";
import { Spinner } from "@roppoh/shadcn/components/ui/spinner";
import { useState } from "react";
import { toast } from "sonner";

import { useDeleteClientMutation } from "@/hooks/better-auth/oidc/use-delete-client-mutation";

interface Props {
  client: OAuthClient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteClientDialog = ({ client, open, onOpenChange }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const mutate = useDeleteClientMutation({
    onError: () => {
      setIsDeleting(false);
      void toast.error("Failed delete OIDC client mutation.");
    },
    onSuccess: () => onOpenChange(false),
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    await mutate.mutateAsync({ client_id: client.client_id });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>Delete OIDC Client</DialogTitle>
          <DialogDescription>
            {client.client_name
              ? `"${client.client_name}" (${client.client_id})`
              : client.client_id}{" "}
            を削除しますか？この操作は取り消せません。
          </DialogDescription>
        </DialogHeader>

        {/* Footer */}
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? <Spinner /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
