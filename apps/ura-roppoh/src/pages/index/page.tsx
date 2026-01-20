import { SidebarTrigger } from "@roppoh/shadcn/components/ui/sidebar";
import { SsgoiTransition } from "@ssgoi/react";

export default function () {
  return (
    <SsgoiTransition id="/">
      <SidebarTrigger />
      <h1>こんにちは</h1>
    </SsgoiTransition>
  );
}
