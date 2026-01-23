import { Outlet, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { authClient } from "@/libs/better-auth";

export default function () {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isPending, error } = authClient.useSession();

  // when error
  if (error) console.error(error);

  // when no login
  if (
    isPending === false &&
    data === null &&
    !location.pathname.startsWith("/login")
  ) {
    return navigate("/login");
  }

  // when no permission
  if (data && !data.user.role?.includes("admin")) {
    toast.error("Access denied - Admin role required", {
      id: "ACCESS_DENIED_BY_INVALID_ROLE",
    });
    return navigate("/login");
  }

  return <Outlet />;
}
