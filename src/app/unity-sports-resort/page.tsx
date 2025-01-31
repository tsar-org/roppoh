"use client";

import { Suspense, useEffect } from "react";
import { UnitySportsResortContext } from "@/components/unitySportsResortContext";
import { useDiscordSDK } from "@/hooks/useDiscordSDK";
import { useSearchParams } from "next/navigation";

const UnitySportsResort = () => {
  const searchParams = useSearchParams();
  const isDebug = searchParams.get("debug") === "true";

  const discordId = process.env.DISCORD_ID as string;

  const { setupDiscordSDK } = useDiscordSDK(discordId);

  useEffect(() => {
    if (!isDebug) {
      setupDiscordSDK();
    }
  }, [setupDiscordSDK, isDebug]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <UnitySportsResortContext />
      </Suspense>
    </>
  );
};

export default function UnitySportsResortWithQueryParams() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UnitySportsResort />
    </Suspense>
  );
}
