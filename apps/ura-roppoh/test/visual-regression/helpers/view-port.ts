import type { BrowserPage } from "vitest/browser";

interface Args {
  type: "desktop" | "mobile";
  page: BrowserPage;
}

export function setViewPort(args: Args) {
  switch (args.type) {
    case "desktop":
      return args.page.viewport(1280, 720);
    case "mobile":
      return args.page.viewport(375, 667);
  }
}
