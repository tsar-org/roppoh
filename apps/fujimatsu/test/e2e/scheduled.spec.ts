import { MiniFlareController } from "@test/helpers/miniflare";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("test scheduled handler", async () => {
  const miniflareController = new MiniFlareController();

  beforeEach(async () => miniflareController.before());
  afterEach(async () => miniflareController.after());

  it("", async () => {
    // arrange
    const mf = miniflareController.getMiniflare();
    const worker = await mf.getWorker();

    // act
    const actual = await worker.scheduled({
      cron: "* * * * *",
      scheduledTime: new Date(1000),
    });

    expect(actual.outcome).toBe("ok");
    expect(actual.noRetry).toBe(false);
  });
});
