import type { BrowserPage } from "vitest/browser";

type setViewPort = (page: BrowserPage) => Promise<void>;

export const setDesktopViewPort: setViewPort = (page: BrowserPage) =>
  page.viewport(1280, 720);
export const setMobileViewPort: setViewPort = (page: BrowserPage) =>
  page.viewport(375, 667);
