"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Root() {
  const router = useRouter();

  useEffect(() => {
    router.push("/unity-sports-resort");
  }, [router]);

  return null;
}
