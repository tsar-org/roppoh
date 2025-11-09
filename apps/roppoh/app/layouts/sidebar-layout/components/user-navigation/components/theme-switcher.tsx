import { SunMoon } from "lucide-react";
import { Theme, useTheme } from "remix-themes";
import { useI18nContext } from "@/i18n/i18n-react";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/shadcn/components/ui/dropdown-menu";

export function ThemeSwitcher() {
  const [, setTheme] = useTheme();
  const { LL } = useI18nContext();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="w-full">
        <SunMoon />
        <p>{LL.sidebar.userNavigation.theme.toggleTheme()}</p>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>
            {LL.sidebar.userNavigation.theme.light()}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>
            {LL.sidebar.userNavigation.theme.dark()}
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
