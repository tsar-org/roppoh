import { expect } from "@playwright/test";

import { testWithMswMock } from "../helpers/test-with-msw-mock";
import { setTheme } from "../helpers/theme";
import { handlers } from "./msw.handler";

testWithMswMock(handlers)("vrt /404 dark", async ({ page }) => {
  // Arrange
  await setTheme({ page, theme: "dark" });

  // Act
  await page.goto("/not-found", { waitUntil: "networkidle" });

  // Assert
  await expect(page).toHaveScreenshot({ fullPage: true });
});

testWithMswMock(handlers)("vrt /404 light", async ({ page }) => {
  // Arrange
  await setTheme({ page, theme: "light" });

  // Act
  await page.goto("/not-found", { waitUntil: "networkidle" });

  // Assert
  await expect(page).toHaveScreenshot({ fullPage: true });
});
