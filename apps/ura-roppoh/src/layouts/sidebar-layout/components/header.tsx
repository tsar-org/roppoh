import {
  SidebarMenu,
  SidebarMenuItem,
} from "@roppoh/shadcn/components/ui/sidebar";

export const Header = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-start">
        <img
          alt="/icons/ura-tsar.svg"
          className="w-8 rounded-md"
          src="/icons/ura-tsar.svg"
        />
        <div className="grid flex-1 pl-2 text-left text-sm leading-tight">
          <span className="truncate font-semibold">Ura Roppoh</span>
          <span className="truncate text-xs">ura-roppoh.tsar-bmb.org</span>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
