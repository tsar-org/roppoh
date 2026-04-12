import { Button } from "@roppoh/shadcn/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@roppoh/shadcn/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@roppoh/shadcn/components/ui/field";
import { Input } from "@roppoh/shadcn/components/ui/input";
import { Label } from "@roppoh/shadcn/components/ui/label";
import { Spinner } from "@roppoh/shadcn/components/ui/spinner";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { Plus, X } from "lucide-react";
import { useQueryStates } from "nuqs";
import { toast } from "sonner";

import { useCreateClientMutation } from "@/hooks/better-auth/oidc/use-create-client-mutation";
import { dialogSearchParams } from "@/pages/oidc-client/params";

import { defaultValues, schema } from "../form-field";

export const Form = () => {
  const [, setParams] = useQueryStates(dialogSearchParams);

  const mutate = useCreateClientMutation({
    onError: () => void toast.error("Failed create OIDC client mutation."),
    onSuccess: () => void setParams({ dialog: null, client_id: null }),
  });

  const form = useForm({
    defaultValues: defaultValues,
    validationLogic: revalidateLogic(),
    validators: { onDynamic: schema },
    onSubmit: async ({ value }) => mutate.mutateAsync(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {/* Header */}
      <DialogHeader>
        <DialogTitle>Create OIDC Client</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>

      {/* Body */}
      <FieldGroup className="py-6">
        {/* client_name */}
        <form.Field name="client_name">
          {(field) => (
            <Field>
              <Label htmlFor={field.name}>Client Name</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={!field.state.meta.isValid}
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>

        {/* redirect_uris */}
        <form.Field name="redirect_uris">
          {(field) => (
            <>
              <Label>Redirect URIs</Label>
              <div className="flex flex-col gap-3">
                {field.state.value.map((_, index) => (
                  <form.Field key={index} name={`redirect_uris[${index}]`}>
                    {(itemField) => (
                      <Field>
                        <div className="flex items-center gap-2">
                          <Input
                            id={itemField.name}
                            name={itemField.name}
                            value={itemField.state.value}
                            onChange={(e) => itemField.handleChange(e.target.value)}
                            onBlur={itemField.handleBlur}
                            aria-invalid={!itemField.state.meta.isValid}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => field.removeValue(index)}
                          >
                            <X />
                          </Button>
                        </div>
                        <FieldError errors={itemField.state.meta.errors} />
                      </Field>
                    )}
                  </form.Field>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={() => field.pushValue("")}>
                <Plus />
                Add redirect uri
              </Button>
            </>
          )}
        </form.Field>
      </FieldGroup>

      {/* Footer */}
      <DialogFooter>
        <DialogClose render={<Button variant="outline">Cancel</Button>} />
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? <Spinner /> : "Save changes"}
            </Button>
          )}
        </form.Subscribe>
      </DialogFooter>
    </form>
  );
};
