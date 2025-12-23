import { testClient } from "hono/testing";
import { describe, expect, it, vi } from "vitest";
import { app } from "../../src/server";

vi.mock("cloudflare:workers", () => {
  return {
    DurableObject: class {},
  };
});

describe("test /.well-known/openid-configuration", async () => {
  const client = testClient(app);

  it("should return 200", async () => {
    // act
    const res = await client[".well-known"]["openid-configuration"].$get();

    // assert
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      authorization_endpoint: "http://localhost/authorize",
      claims_supported: [
        "sub",
        "name",
        "email",
        "email_verified",
        "guilds",
        "preferred_username",
      ],
      grant_types_supported: ["authorization_code"],
      id_token_signing_alg_values_supported: ["RS256"],
      issuer: "http://localhost",
      jwks_uri: "http://localhost/jwks.json",
      response_types_supported: ["code"],
      scopes_supported: ["openid", "profile", "email"],
      subject_types_supported: ["public"],
      token_endpoint: "http://localhost/token",
      userinfo_endpoint: "http://localhost/userinfo",
    });
  });
});
