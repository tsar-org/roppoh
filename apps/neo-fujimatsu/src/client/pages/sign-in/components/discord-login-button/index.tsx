import { Button } from "@roppoh/shadcn/components/ui/button";
import { Spinner } from "@roppoh/shadcn/components/ui/spinner";
import { useTransition } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

import { authClient } from "@/client/libs/better-auth";

import DiscordIconSvg from "./assets/discord-icon.svg";

export function DiscordLoginButton() {
  const [isPending, startTransition] = useTransition();
  const [searchParams] = useSearchParams();

  const signIn = async () =>
    startTransition(async () => {
      const redirect = searchParams.get("redirect");
      // oauthProvider 方式: /sign-in?client_id=...&sig=... で来た場合は consent URL を再構築
      // authenticated-layout 方式: /sign-in?redirect=/consent?... で来た場合はそのまま使用
      const callbackURL = redirect ?? (searchParams.has("sig") ? `/consent?${searchParams}` : "/");
      const res = await authClient.signIn.social({
        callbackURL,
        provider: "discord",
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
