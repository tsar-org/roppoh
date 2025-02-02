"use client";

import UnitySportsResort from "@/app/unity-sports-resort/_components/unitySportsResort";
import { useDiscordSDK } from "@/app/unity-sports-resort/hooks/useDiscordSDK";
import Loading from "@/components/Loading";
import PageTransition from "@/components/pageTransition";
import { Suspense, useEffect } from "react";

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
