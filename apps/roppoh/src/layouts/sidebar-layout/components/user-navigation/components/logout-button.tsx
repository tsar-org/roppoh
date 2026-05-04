import { DropdownMenuItem } from "@roppoh/shadcn/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";

import { auth } from "@/libs/better-auth";
import { useAuth } from "@/root/components/auth-provider";

export function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () =>
    await Promise.all([
      auth.signOut({
        fetchOptions: { onSuccess: () => navigate(`/login`) },
      }),
      logout(),
    ]);

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      Logout
    </DropdownMenuItem>
  );
}
