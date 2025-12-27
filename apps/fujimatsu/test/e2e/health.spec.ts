import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

describe("test /health", async () => {
  it("should return 200", async () => {
    // act
    // const res = await client.health.$get();
    const res = await SELF.fetch("http://localhost:5173/health");

    // assert
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: "ok" });
  });
});
