import { Button } from "@roppoh/shadcn/components/ui/button";
import { Spinner } from "@roppoh/shadcn/components/ui/spinner";
import { useTransition } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

import { authClient } from "@/client/libs/better-auth";

import DiscordIconSvg from "./assets/discord-icon.svg";

export function DiscordLoginButton() {
  const [isPending, startTransition] = useTransition();
  const params = useSearchParams();

  const signIn = async () =>
    startTransition(async () => {
      const res = await authClient.signIn.social({
        callbackURL: `${window.location.origin}/`,
        provider: "discord",
        scopes: ["identify", "guilds"],
        fetchOptions: { params },
      });
      if (res.error) toast.error(res.error.statusText);
    });

  return (
    <Button className="gap-3" disabled={isPending} onClick={signIn} type="button" variant="outline">
      {isPending && <Spinner />}
      <img alt="discord-icon" className="size-4" src={DiscordIconSvg} />
      Login with Discord
    </Button>
  );
}
