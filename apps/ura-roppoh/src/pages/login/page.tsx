import { Button } from "@roppoh/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@roppoh/shadcn/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@roppoh/shadcn/components/ui/field";
import { Spinner } from "@roppoh/shadcn/components/ui/spinner";
import { SsgoiTransition } from "@ssgoi/react";
import { GalleryVerticalEnd } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { authClient } from "@/libs/better-auth";
import DiscordIconSvg from "./assets/discord-icon.svg";

export default function () {
  const [isPending, startTransition] = useTransition();

  const signIn = async () =>
    startTransition(async () => {
      const res = await authClient.signIn.social({
        callbackURL: `${window.location.origin}/`,
        provider: "discord",
        scopes: ["identify", "guilds"],
      });
      if (res.error) toast.error(res.error.message);
    });

  return (
    <SsgoiTransition id="/login">
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a
            className="flex items-center gap-2 self-center font-medium"
            href="https://github.com/tsar-org"
          >
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Ura Roppoh
          </a>
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription>
                  Login with your Discord account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <Button
                      className="gap-3"
                      disabled={isPending}
                      onClick={signIn}
                      type="button"
                      variant="outline"
                    >
                      {isPending && <Spinner />}
                      <img
                        alt="discord-icon"
                        className="size-4"
                        src={DiscordIconSvg}
                      />
                      Login with Discord
                    </Button>
                  </Field>

                  <Field>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account?
                      <a
                        className="px-1"
                        href="https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1"
                      >
                        Sign up
                      </a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
              <a href="/">Ura Roppoh</a> is{" "}
              <a href="https://roppoh.tsar-bmb.org">Roppoh</a>'s super admin
              console, accessible only to super administrators.
            </FieldDescription>
          </div>
        </div>
      </div>
    </SsgoiTransition>
  );
}
