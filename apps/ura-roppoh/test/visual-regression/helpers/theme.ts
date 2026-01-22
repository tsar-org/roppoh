import type { Theme } from "@/root/components/theme-provider";

interface Args {
  theme: Theme;
}

export const setTheme = (args: Args) =>
  localStorage.setItem("theme", `"${args.theme}"`);
