import { expect } from "@playwright/test";

import { testWithMswMock } from "../helpers/test-with-msw-mock";
import { setTheme } from "../helpers/theme";
import { handlers } from "./msw.handler";

testWithMswMock(handlers)("vrt /sign-in", async ({ page }) => {
  // Arrange
  await setTheme({ page, theme: "dark" });

  // Act
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  // Assert
  await expect(page).toHaveScreenshot({ fullPage: true });
});
