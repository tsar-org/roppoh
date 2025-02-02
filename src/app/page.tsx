"use client";

import { ToggleThemeButton } from "@/app/_components/state/toggleThemeButton";
import { UnitySportsResortCard } from "@/app/_components/state/unitySportsResortCard";
import { TsarOrganizationLink } from "@/app/_components/ui/tsarOrganizationLink";
import Image from "next/image";

export default function TopPage() {
  return (
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
        <Image
          src="/tsar-icon.png"
          alt="Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 size-full dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
