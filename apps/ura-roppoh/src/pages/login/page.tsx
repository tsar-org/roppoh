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
import { SsgoiTransition } from "@ssgoi/react";
import { GalleryVerticalEnd } from "lucide-react";
import { DiscordLoginButton } from "./components/discord-login-button";
import { EmailLoginForm } from "./components/email-login-form";

export default function () {
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
                    <DiscordLoginButton />
                  </Field>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or continue with
                  </FieldSeparator>
                  <EmailLoginForm />
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
