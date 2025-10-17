import { Outlet } from "react-router";
import { SidebarContext } from "@/shadcn/components/ui/sidebar";

const mockValue = {
  isMobile: false,
  open: false,
  openMobile: false,
  setOpen: () => {},
  setOpenMobile: () => {},
  state: "expanded" as const,
  toggleSidebar: () => {},
};

export const SidebarForTest = () => {
  return (
    <SidebarContext.Provider value={mockValue}>
      <Outlet />
    </SidebarContext.Provider>
  );
};
