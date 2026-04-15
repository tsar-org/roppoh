import { expect } from "@playwright/test";

import { testWithMswMock } from "../helpers/test-with-msw-mock";
import { setTheme } from "../helpers/theme";
import { handlers } from "./msw.handler";

const CONSENT_URL =
  "/consent?client_id=test-client-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&cancel_uri=http%3A%2F%2Flocalhost%3A3000%2Fcancel&scope=profile+email";

testWithMswMock(handlers)("vrt /consent dark", async ({ page }) => {
  // Arrange
  await setTheme({ page, theme: "dark" });

  // Act
  await page.goto(CONSENT_URL, { waitUntil: "networkidle" });

  // Assert
  await expect(page).toHaveScreenshot({ fullPage: true });
});

testWithMswMock(handlers)("vrt /consent light", async ({ page }) => {
  // Arrange
  await setTheme({ page, theme: "light" });

  // Act
  await page.goto(CONSENT_URL, { waitUntil: "networkidle" });

  // Assert
  await expect(page).toHaveScreenshot({ fullPage: true });
});
