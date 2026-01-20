import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@roppoh/shadcn/components/ui/dropdown-menu";
import { SunMoon } from "lucide-react";
import { useTheme } from "@/contexts/theme";

export function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="w-full">
        <SunMoon />
        <p>Toggle theme</p>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Light
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
