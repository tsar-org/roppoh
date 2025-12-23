import { testClient } from "hono/testing";
import { describe, expect, it, vi } from "vitest";
import { app } from "../../src/server";

vi.mock("cloudflare:workers", () => {
  return {
    DurableObject: class {},
  };
});

describe("test /health", async () => {
  const client = testClient(app);

  it("should return 200", async () => {
    // act
    const res = await client.health.$get();

    // assert
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: "ok" });
  });
});
