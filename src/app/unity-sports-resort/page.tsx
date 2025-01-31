"use client";

import { Suspense } from "react";
import { UnitySportsResortContext } from "@/components/unitySportsResortContext";

export default function UnitySportsResort() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <UnitySportsResortContext />
      </Suspense>
    </>
  );
}
