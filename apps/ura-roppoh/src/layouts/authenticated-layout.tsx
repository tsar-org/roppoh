import { Outlet, useLocation, useNavigate } from "react-router";
import { authClient } from "@/libs/better-auth";

export default function () {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isPending, error } = authClient.useSession();

  if (error) console.error(error);

  if (
    isPending === false &&
    data === null &&
    !location.pathname.startsWith("/login")
  ) {
    return navigate("/login");
  }

  return <Outlet />;
}
