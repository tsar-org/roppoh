import { Theme } from "remix-themes";
import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import IndexPage from "@/pages/index/page";
import { RootComponent } from "../helpers/root-component";

describe("VRT index page", async () => {
  test("desktop dark", async () => {
    page.viewport(1280, 720);

    const screen = render(
      <RootComponent theme={Theme.DARK}>
        <IndexPage />
      </RootComponent>,
    );

    await document.fonts.ready;
    await expect(screen.container).toMatchScreenshot();
  });

  test("desktop light", async () => {
    page.viewport(1280, 720);

    const screen = render(
      <RootComponent theme={Theme.LIGHT}>
        <IndexPage />
      </RootComponent>,
    );

    await document.fonts.ready;
    await expect(screen.container).toMatchScreenshot();
  });

  test("mobile dark", async () => {
    page.viewport(375, 667);

    const screen = render(
      <RootComponent theme={Theme.DARK}>
        <IndexPage />
      </RootComponent>,
    );

    await document.fonts.ready;
    await expect(screen.container).toMatchScreenshot();
  });

  test("mobile light", async () => {
    page.viewport(375, 667);

    const screen = render(
      <RootComponent theme={Theme.LIGHT}>
        <IndexPage />
      </RootComponent>,
    );

    await document.fonts.ready;
    await expect(screen.container).toMatchScreenshot();
  });
});
