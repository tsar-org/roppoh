import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18nContext } from "@/i18n/i18n-react";
import { authClient } from "@/libs/better-auth/auth.client";
import { DropdownMenuItem } from "@/shadcn/components/ui/dropdown-menu";

export function LogoutButton() {
  const { LL, locale } = useI18nContext();
  const navigate = useNavigate();

  const handleLogout = async () =>
    authClient.signOut({
      fetchOptions: { onSuccess: () => navigate(`/${locale}/login`) },
    });

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      {LL.sidebar.userNavigation.logOut()}
    </DropdownMenuItem>
  );
}
