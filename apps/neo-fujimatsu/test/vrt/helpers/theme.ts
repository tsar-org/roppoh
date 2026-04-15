import type { Page } from "@playwright/test";

import type { Theme } from "@/client/root/components/theme-provider";

interface Args {
  page: Page;
  theme: Theme;
}

export const setTheme = async (args: Args) =>
  await args.page
    .context()
    .addInitScript(() => void localStorage.setItem("theme", `"${args.theme}"`));
