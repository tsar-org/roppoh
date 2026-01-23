import { Button } from "@roppoh/shadcn/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@roppoh/shadcn/components/ui/field";
import { Input } from "@roppoh/shadcn/components/ui/input";
import { Spinner } from "@roppoh/shadcn/components/ui/spinner";
import { useRef, useTransition } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { authClient } from "@/libs/better-auth";

export function EmailLoginForm() {
  const navigate = useNavigate();

  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();

  const signIn = async () =>
    startTransition(async () => {
      const res = await authClient.signIn.email({
        // callbackURL: `${window.location.origin}/`,
        email: inputEmailRef.current?.value || "",
        password: inputPasswordRef.current?.value || "",
        rememberMe: true,
      });
      if (res.error) {
        toast.error(res.error.statusText);
        return;
      }

      return await navigate("/");
    });

  return (
    <>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          placeholder="super-admin@tsar-bmb.org"
          ref={inputEmailRef}
          required
          type="email"
        />
      </Field>
      <Field>
        <div className="flex items-center">
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <a
            className="ml-auto text-muted-foreground text-xs underline-offset-4 hover:underline"
            href="https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1"
          >
            Forgot your password?
          </a>
        </div>
        <Input id="password" ref={inputPasswordRef} required type="password" />
      </Field>

      <Field>
        <Button
          disabled={isPending}
          onClick={signIn}
          type="submit"
          variant="outline"
        >
          {isPending && <Spinner />}
          Login
        </Button>
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
    </>
  );
}
