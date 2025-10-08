import { Theme } from "remix-themes";
import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import LoginPage from "@/pages/login/page";
import { RootComponent } from "../helpers/root-component";

describe("VRT login page", async () => {
  test("desktop dark", async () => {
    page.viewport(1280, 720);

    const screen = render(
      <RootComponent theme={Theme.DARK}>
        <LoginPage />
      </RootComponent>,
    );

    await document.fonts.ready;
    await expect(screen.container).toMatchScreenshot();
  });

  test("desktop light", async () => {
    page.viewport(1280, 720);

    const screen = render(
      <RootComponent theme={Theme.LIGHT}>
        <LoginPage />
      </RootComponent>,
    );

    await document.fonts.ready;
    await expect(screen.container).toMatchScreenshot();
  });

  test("mobile dark", async () => {
    page.viewport(375, 667);

    const screen = render(
      <RootComponent theme={Theme.DARK}>
        <LoginPage />
      </RootComponent>,
    );

    await document.fonts.ready;
    await expect(screen.container).toMatchScreenshot();
  });

  test("mobile light", async () => {
    page.viewport(375, 667);

    const screen = render(
      <RootComponent theme={Theme.LIGHT}>
        <LoginPage />
      </RootComponent>,
    );

    await document.fonts.ready;
    await expect(screen.container).toMatchScreenshot();
  });
});
