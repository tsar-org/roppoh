import { Outlet, useNavigate } from "react-router";

import { authClient } from "@/client/libs/better-auth";

export default function () {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  if (!isPending && !session) {
    return navigate("/sign-in");
  }

  return <Outlet />;
}
