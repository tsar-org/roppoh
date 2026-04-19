import { Button } from "@roppoh/shadcn/components/ui/button";
import { Spinner } from "@roppoh/shadcn/components/ui/spinner";
import { useTransition } from "react";

import { useAuth } from "@/libs/oidc/use-auth";

export function LoginButton() {
  const [isPending, startTransition] = useTransition();
  const { login } = useAuth();

  const signIn = async () => startTransition(async () => await login());

  return (
    <Button className="w-full" disabled={isPending} onClick={signIn} type="button">
      {isPending && <Spinner />}
      Sign in
    </Button>
  );
}
