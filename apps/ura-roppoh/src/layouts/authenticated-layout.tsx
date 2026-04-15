import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { useAuth } from "@/libs/oidc/use-auth";

export default function () {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void navigate("/login");
    }
  }, [isLoading, isAuthenticated]);

  return <Outlet />;
}
