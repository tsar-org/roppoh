import { Dialog, DialogContent } from "@roppoh/shadcn/components/ui/dialog";
import { useQueryStates } from "nuqs";

import { dialogSearchParams } from "@/pages/oidc-client/params";

import { Form } from "./components/form";

export const CreateClientDialog = () => {
  const [, setParams] = useQueryStates(dialogSearchParams);

  return (
    <Dialog open={true} onOpenChange={() => void setParams({ dialog: null, client_id: null })}>
      <DialogContent className="sm:max-w-sm">
        <Form />
      </DialogContent>
    </Dialog>
  );
};
