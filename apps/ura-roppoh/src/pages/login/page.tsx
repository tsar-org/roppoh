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
  FieldSeparator,
} from "@roppoh/shadcn/components/ui/field";
import { Spinner } from "@roppoh/shadcn/components/ui/spinner";
import { SsgoiTransition } from "@ssgoi/react";
import { GalleryVerticalEnd } from "lucide-react";
import { useTransition } from "react";
import { useSearchParams } from "react-router";

import { useAuth } from "@/libs/oidc/use-auth";

import { DiscordLoginButton } from "./components/discord-login-button";
import { EmailLoginForm } from "./components/email-login-form";

function OidcLoginButton() {
  const { login } = useAuth();
  const [isPending, startTransition] = useTransition();

  const handleLogin = () =>
    startTransition(async () => {
      await login();
    });

  return (
    <Button className="w-full" disabled={isPending} onClick={handleLogin} type="button">
      {isPending && <Spinner />}
      Sign in
    </Button>
  );
}

export default function () {
  const [searchParams] = useSearchParams();

  // better-auth oauthProvider がloginPageにリダイレクトする際は
  // client_id, scope, redirect_uri, state, exp, sig 等が付与される
  const isOidcFlow = searchParams.has("client_id");

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
                  {isOidcFlow ? "Login with your account to continue" : "Sign in to Ura Roppoh"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isOidcFlow ? (
                  <FieldGroup>
                    <Field>
                      <DiscordLoginButton />
                    </Field>
                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                      Or continue with
                    </FieldSeparator>
                    <EmailLoginForm />
                  </FieldGroup>
                ) : (
                  <OidcLoginButton />
                )}
              </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
              <a href="/">Ura Roppoh</a> is <a href="https://roppoh.tsar-bmb.org">Roppoh</a>'s super
              admin console, accessible only to super administrators.
            </FieldDescription>
          </div>
        </div>
      </div>
    </SsgoiTransition>
  );
}
