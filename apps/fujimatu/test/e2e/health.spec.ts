import { describe, expect, it } from "vitest";
import app from "../../src/server";

describe("test /health", async () => {
  it("should return 200", async () => {
    // act
    const res = await app.request("/api/rest/health");

    // assert
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: "OK" });
  });
});
