import { Outlet, useNavigate } from "react-router";

import { useAuth } from "@/libs/oidc/use-auth";

export default function () {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  if (!isLoading && !isAuthenticated) {
    return navigate("/login");
  }

  return <Outlet />;
}
