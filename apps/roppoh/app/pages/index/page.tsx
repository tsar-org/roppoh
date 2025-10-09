import PageTransition from "@/components/page-transition";
import { ToggleThemeButton } from "@/components/toggle-theme-button";
import { TsarOrganizationLink } from "@/components/tsar-organization-link";
import { UnitySportsResortCard } from "@/pages/index/components/state/unitySportsResortCard";

export default function () {
  return (
    <PageTransition>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-between">
            <TsarOrganizationLink />
            <ToggleThemeButton />
          </div>

          <div className="mt-1 flex w-full flex-1 flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="font-bold text-4xl">Roppoh</h1>
              <p className="text-balance text-muted-foreground text-sm">
                Roppoh is discord activity hosting server
              </p>
            </div>

            <div className="flex w-full max-w-md flex-col justify-center">
              <UnitySportsResortCard />
            </div>
          </div>
        </div>

        <div className="relative hidden bg-muted lg:block">
          <img
            alt="tsar-org-icon"
            className="absolute inset-0 size-full dark:brightness-[0.2] dark:grayscale"
            src="/icons/tsar-icon.png"
          />
        </div>
      </div>
    </PageTransition>
  );
}
