import { DropdownMenuItem } from "@roppoh/shadcn/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { authClient } from "@/libs/better-auth";

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () =>
    authClient.signOut({
      fetchOptions: { onSuccess: () => navigate(`/login`) },
    });

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      Logout
    </DropdownMenuItem>
  );
}
