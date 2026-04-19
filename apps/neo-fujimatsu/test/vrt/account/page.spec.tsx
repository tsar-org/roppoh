import { expect } from "@playwright/test";

import { testWithMswMock } from "../helpers/test-with-msw-mock";
import { setTheme } from "../helpers/theme";
import { handlersEmpty, handlersWithPasskeys } from "./msw.handler";

testWithMswMock(handlersEmpty)("vrt /account dark", async ({ page }) => {
  // Arrange
  await setTheme({ page, theme: "dark" });

  // Act
  await page.goto("/account", { waitUntil: "networkidle" });

  // Assert
  await expect(page).toHaveScreenshot({ fullPage: true });
});

testWithMswMock(handlersEmpty)("vrt /account light", async ({ page }) => {
  // Arrange
  await setTheme({ page, theme: "light" });

  // Act
  await page.goto("/account", { waitUntil: "networkidle" });

  // Assert
  await expect(page).toHaveScreenshot({ fullPage: true });
});

testWithMswMock(handlersWithPasskeys)("vrt /account dark with passkeys", async ({ page }) => {
  // Arrange
  await setTheme({ page, theme: "dark" });

  // Act
  await page.goto("/account", { waitUntil: "networkidle" });

  // Assert
  await expect(page).toHaveScreenshot({ fullPage: true });
});

testWithMswMock(handlersWithPasskeys)("vrt /account light with passkeys", async ({ page }) => {
  // Arrange
  await setTheme({ page, theme: "light" });

  // Act
  await page.goto("/account", { waitUntil: "networkidle" });

  // Assert
  await expect(page).toHaveScreenshot({ fullPage: true });
});

testWithMswMock(handlersEmpty)("vrt /account dark add dialog open", async ({ page }) => {
  // Arrange
  await setTheme({ page, theme: "dark" });

  // Act
  await page.goto("/account?dialog=add", { waitUntil: "networkidle" });

  // Assert
  await expect(page).toHaveScreenshot({ fullPage: true });
});

testWithMswMock(handlersEmpty)("vrt /account light add dialog open", async ({ page }) => {
  // Arrange
  await setTheme({ page, theme: "light" });

  // Act
  await page.goto("/account?dialog=add", { waitUntil: "networkidle" });

  // Assert
  await expect(page).toHaveScreenshot({ fullPage: true });
});

testWithMswMock(handlersWithPasskeys)("vrt /account dark delete dialog open", async ({ page }) => {
  // Arrange
  await setTheme({ page, theme: "dark" });

  // Act
  await page.goto("/account?dialog=delete&passkey_id=passkey-1", { waitUntil: "networkidle" });

  // Assert
  await expect(page).toHaveScreenshot({ fullPage: true });
});

testWithMswMock(handlersWithPasskeys)("vrt /account light delete dialog open", async ({ page }) => {
  // Arrange
  await setTheme({ page, theme: "light" });

  // Act
  await page.goto("/account?dialog=delete&passkey_id=passkey-1", { waitUntil: "networkidle" });

  // Assert
  await expect(page).toHaveScreenshot({ fullPage: true });
});
