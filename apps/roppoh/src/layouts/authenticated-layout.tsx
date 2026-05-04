import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { useAuth } from "@/root/components/auth-provider";

export default function () {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      return void navigate("/login");
    }
  }, [isLoading, isAuthenticated]);

  return <Outlet />;
}
