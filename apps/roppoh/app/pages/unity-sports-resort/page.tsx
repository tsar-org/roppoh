import type { MetaFunction } from "react-router";
import PageTransition from "@/components/page-transition";
import { baseMeta } from "@/libs/react-router/base-meta-function";
import UnitySportsResort from "./components/unity-sports-resort";

export const meta: MetaFunction = () => [
  ...baseMeta({ title: "Unity Sports Resort" }),
];

export default function () {
  return (
    <PageTransition>
      <UnitySportsResort />
    </PageTransition>
  );
}
