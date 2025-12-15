import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

describe("test /health", async () => {
  it("should return 200", async () => {
    // act
    const res = await SELF.fetch("/health");

    // assert
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: "ok" });
  });
});
