import type { BrowserPage } from "vitest/browser";

interface Args {
  type: "desktop" | "mobile";
  page: BrowserPage;
}

export async function setViewPort(args: Args) {
  if (args.type === "desktop") {
    return await args.page.viewport(1280, 720);
  }
  return await args.page.viewport(375, 667);
}
