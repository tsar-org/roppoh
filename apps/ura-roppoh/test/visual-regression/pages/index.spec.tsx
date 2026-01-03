import { expect, test } from "@playwright/test";

test.describe("index page", async () => {
  test("initial state", async ({ page }) => {
    // Arrange
    await page.goto("/");

    // Assert
    await expect(page).toHaveScreenshot();
  });
});
