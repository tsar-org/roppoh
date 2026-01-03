import { MiniFlareController } from "@test/helpers/miniflare";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("test /.well-known/openid-configuration", async () => {
  const miniflareController = new MiniFlareController();

  beforeEach(async () => miniflareController.before());
  afterEach(async () => miniflareController.after());

  it("should return 200", async () => {
    // arrange
    const mf = miniflareController.getMiniflare();

    // act
    const res = await mf.dispatchFetch(
      "http://localhost/.well-known/openid-configuration",
    );

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
