import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "@/libs/oidc/use-auth";

export default function () {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      void navigate("/");
    }
  }, [isLoading, isAuthenticated, navigate]);

  return (
    <div className="flex min-h-svh items-center justify-center">
      <p className="text-muted-foreground">Completing sign in...</p>
    </div>
  );
}
