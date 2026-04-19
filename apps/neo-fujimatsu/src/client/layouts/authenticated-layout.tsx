import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import { authClient } from "@/client/libs/better-auth";

export default function () {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    if (session) return;
    const redirectTo = location.pathname + location.search + location.hash;
    navigate(`/sign-in?redirect=${encodeURIComponent(redirectTo)}`);
  }, [session]);

  return <Outlet />;
}
