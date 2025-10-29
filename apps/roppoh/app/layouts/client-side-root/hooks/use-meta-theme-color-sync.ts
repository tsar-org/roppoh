import { useEffect } from "react";
import { useTheme } from "remix-themes";
import { themeColorToHexColor } from "@/utils/theme-color-to-hex-color";

export function useMetaThemeColorSync() {
  const [theme] = useTheme();

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!theme || !meta) return;

    meta.setAttribute("content", themeColorToHexColor(theme));
  }, [theme]);

  return {};
}
