import { SsgoiTransition } from "@ssgoi/react";
import { SiteHeader } from "@/components/header";

export default function () {
  return (
    <SsgoiTransition id="/">
      <SiteHeader title={"welcome"} />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 transform text-center">
        <h1 className="font-bold text-2xl">Welcome to Ura Roppoh</h1>
        <div className="text-muted-foreground">
          <a className="underline" href="/">
            Ura Roppoh
          </a>{" "}
          is{" "}
          <a className="underline" href="https://roppoh.tsar-bmb.org">
            Roppoh
          </a>
          's super admin console, accessible only to super administrators.
        </div>
      </div>
    </SsgoiTransition>
  );
}
