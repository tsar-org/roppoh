import { ChevronsUpDown, LogOut, SunMoon } from "lucide-react";
import { useNavigate } from "react-router";
import { Theme, useTheme } from "remix-themes";
import { authClient } from "@/libs/better-auth/auth.client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shadcn/components/ui/sidebar";

export function UserNavigation() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const { data } = authClient.useSession();
  const [, setTheme] = useTheme();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  alt={`${data?.user.name}-icon`}
                  src={data?.user.image || ""}
                />
                <AvatarFallback className="rounded-lg">
                  {data?.user.name}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {data?.user.name}
                </span>
                <span className="truncate text-xs">{data?.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    alt={`${data?.user.name}-icon`}
                    src={data?.user.image || ""}
                  />
                  <AvatarFallback className="rounded-lg">
                    {data?.user.name}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {data?.user.name}
                  </span>
                  <span className="truncate text-xs">{data?.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="w-full">
                  <SunMoon />
                  <p className="">Toggle theme</p>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>
                      Dark
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem
                onClick={async () => {
                  authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        navigate("/login");
                      },
                    },
                  });
                }}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
