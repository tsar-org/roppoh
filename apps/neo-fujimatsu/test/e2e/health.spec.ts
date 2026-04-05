import { exports } from "cloudflare:workers";
import { describe, it, expect } from "vitest";

describe("/health", () => {
  it("responds 200", async () => {
    const response = await exports.default.fetch("http://example.com/health");
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ message: "ok" });
  });
});
