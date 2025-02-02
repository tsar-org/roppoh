"use client";

import Loading from "@/components/Loading";
import PageTransition from "@/components/pageTransition";
import { useDiscordSDK } from "@/hooks/useDiscordSDK";
import { Suspense, lazy, useEffect } from "react";

const UnitySportsResort = lazy(
  () => import("@/app/unity-sports-resort/_components/unitySportsResort"),
);

export default function UnitySportsResortPage() {
  const discordId = process.env.DISCORD_ID as string;

  const { setupDiscordSDK } = useDiscordSDK(discordId);

  useEffect(() => {
    setupDiscordSDK();
  }, [setupDiscordSDK]);

  return (
    <PageTransition>
      <Suspense
        fallback={
          <div className="h-[100vh] w-[100vw]">
            <Loading />
          </div>
        }
      >
        <UnitySportsResort />
      </Suspense>
    </PageTransition>
  );
}
