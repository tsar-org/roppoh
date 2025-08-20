import { Suspense } from "react";

import Loading from "@/components/Loading";
import PageTransition from "@/components/PageTransition";

import UnitySportsResort from "./components/UnitySportsResort";

export default function UnitySportsResortPage() {
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
