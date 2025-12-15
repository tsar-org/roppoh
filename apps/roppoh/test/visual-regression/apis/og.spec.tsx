import { describe, expect, test } from "vitest";
import { type BrowserPage, page } from "vitest/browser";
import { render } from "vitest-browser-react";
import { OG } from "@/apis/og/components/og";

const seOgViewPort = (page: BrowserPage) => page.viewport(1200, 630);

function OgRoot({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        height: 630,
        width: 1200,
      }}
    >
      {children}
    </div>
  );
}

describe("VRT OG", async () => {
  test("empty title", async () => {
    // Arrange
    await seOgViewPort(page);
    const title = "";

    // Act
    const screen = await render(
      <OgRoot>
        <OG title={title} />
      </OgRoot>,
    );

    // Assert
    await expect(screen.container).toMatchScreenshot();
  });

  test("short title", async () => {
    // Arrange
    await seOgViewPort(page);
    const title = "Welcome";

    // Act
    const screen = await render(
      <OgRoot>
        <OG title={title} />
      </OgRoot>,
    );

    // Assert
    await expect(screen.container).toMatchScreenshot();
  });

  test("medium title", async () => {
    // Arrange
    await seOgViewPort(page);
    const title = "Welcome to Roppoh";

    // Act
    const screen = await render(
      <OgRoot>
        <OG title={title} />
      </OgRoot>,
    );

    // Assert
    await expect(screen.container).toMatchScreenshot();
  });

  test("long title", async () => {
    // Arrange
    await seOgViewPort(page);
    const title =
      "This is a very long title to verify text wrapping and truncation behavior";

    // Act
    const screen = await render(
      <OgRoot>
        <OG title={title} />
      </OgRoot>,
    );

    // Assert
    await expect(screen.container).toMatchScreenshot();
  });

  test("multiline title", async () => {
    // Arrange
    await seOgViewPort(page);
    const title = "Welcome to Roppoh\nmulti line text. AAAAAAAAAA";

    // Act
    const screen = await render(
      <OgRoot>
        <OG title={title} />
      </OgRoot>,
    );

    // Assert
    await expect(screen.container).toMatchScreenshot();
  });
});
