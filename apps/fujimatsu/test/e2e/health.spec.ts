import { MiniFlareController } from "@test/helpers/miniflare";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("test /health", async () => {
  const miniflareController = new MiniFlareController();

  beforeEach(async () => miniflareController.before());
  afterEach(async () => miniflareController.after());

  it("should return 200", async () => {
    // arrange
    const mf = miniflareController.getMiniflare();

    // act
    // const res = await client.health.$get();
    const res = await mf.dispatchFetch("http://localhost:5173/health");

    // assert
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: "ok" });
  });
});
