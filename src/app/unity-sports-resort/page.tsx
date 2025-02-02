"use client";

import { UnitySportsResortContext } from "@/components/unitySportsResortContext";
import { useDiscordSDK } from "@/hooks/useDiscordSDK";
import { Suspense, useEffect } from "react";

export default function UnitySportsResort() {
  const discordId = process.env.DISCORD_ID as string;

  const { setupDiscordSDK } = useDiscordSDK(discordId);

  useEffect(() => {
    setupDiscordSDK();
  }, [setupDiscordSDK]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <UnitySportsResortContext />
      </Suspense>
    </>
  );
}
