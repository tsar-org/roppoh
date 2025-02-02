"use client";

import { UnitySportsResort } from "@/app/unity-sports-resort/_components/unitySportsResort";
import { useDiscordSDK } from "@/hooks/useDiscordSDK";
import { Suspense, useEffect } from "react";

export default function UnitySportsResortPage() {
  const discordId = process.env.DISCORD_ID as string;

  const { setupDiscordSDK } = useDiscordSDK(discordId);

  useEffect(() => {
    setupDiscordSDK();
  }, [setupDiscordSDK]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <UnitySportsResort />
      </Suspense>
    </>
  );
}
