import { Dialog, DialogContent } from "@roppoh/shadcn/components/ui/dialog";
import { useQueryStates } from "nuqs";

import { dialogSearchParams } from "@/client/pages/account/params";

import { Form } from "./components/form";

export const AddPasskeyDialog = () => {
  const [, setParams] = useQueryStates(dialogSearchParams);

  return (
    <Dialog open={true} onOpenChange={() => void setParams({ dialog: null, passkey_id: null })}>
      <DialogContent className="sm:max-w-sm">
        <Form />
      </DialogContent>
    </Dialog>
  );
};
