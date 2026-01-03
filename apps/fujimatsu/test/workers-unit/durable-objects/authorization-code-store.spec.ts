import { getDefaultDurableObjectsFromMiniflare } from "@test/helpers/durable-objects";
import { MiniFlareController } from "@test/helpers/miniflare";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { generateRandomAuthCode } from "../../helpers/authorization-code";

describe("test durable-objects AuthorizationCodeStore", async () => {
  const miniflareController = new MiniFlareController();

  beforeEach(async () => miniflareController.before());
  afterEach(async () => miniflareController.after());
  it("issues and consumes authorization code", async () => {
    // arrange
    const mf = miniflareController.getMiniflare();
    const object = await getDefaultDurableObjectsFromMiniflare(mf);
    const code = generateRandomAuthCode({});

    // act
    await object.issue(code);
    const consumed = await object.consume({
      clientId: code.clientId,
      code: code.code,
      redirectUri: code.redirectUri,
    });

    // assert
    expect(consumed).toBeDefined();
    expect(consumed?.clientId).toBe(code.clientId);
    expect(consumed?.code).toBe(code.code);
    expect(consumed?.consume).toBe(true); // consumed flag should be true
  });

  describe("consume() validation failures", () => {
    it("returns null for expired authorization code", async () => {
      // arrange
      const mf = miniflareController.getMiniflare();
      const object = await getDefaultDurableObjectsFromMiniflare(mf);
      const code = generateRandomAuthCode({
        expiresAt: Date.now() - 1000, // 1 second ago
      });

      await object.issue(code);

      // act
      const consumed = await object.consume({
        clientId: code.clientId,
        code: code.code,
        redirectUri: code.redirectUri,
      });

      // assert
      expect(consumed).toBeNull();
    });

    it("returns null for already consumed authorization code", async () => {
      // arrange
      const mf = miniflareController.getMiniflare();
      const object = await getDefaultDurableObjectsFromMiniflare(mf);
      const code = generateRandomAuthCode({
        expiresAt: Date.now() + 60000, // 1 minute in future
      });

      await object.issue(code);

      // consume once (first consumption)
      const firstConsume = await object.consume({
        clientId: code.clientId,
        code: code.code,
        redirectUri: code.redirectUri,
      });

      expect(firstConsume).toBeDefined();

      // act - try to consume again
      const secondConsume = await object.consume({
        clientId: code.clientId,
        code: code.code,
        redirectUri: code.redirectUri,
      });

      // assert
      expect(secondConsume).toBeNull();
    });

    it("returns null when clientId does not match", async () => {
      // arrange
      const mf = miniflareController.getMiniflare();
      const object = await getDefaultDurableObjectsFromMiniflare(mf);
      const code = generateRandomAuthCode({
        expiresAt: Date.now() + 60000,
      });

      await object.issue(code);

      // act
      const consumed = await object.consume({
        clientId: "different-client-id",
        code: code.code,
        redirectUri: code.redirectUri,
      });

      // assert
      expect(consumed).toBeNull();
    });

    it("returns null when redirectUri does not match", async () => {
      // arrange
      const mf = miniflareController.getMiniflare();
      const object = await getDefaultDurableObjectsFromMiniflare(mf);
      const code = generateRandomAuthCode({
        expiresAt: Date.now() + 60000,
      });

      await object.issue(code);

      // act
      const consumed = await object.consume({
        clientId: code.clientId,
        code: code.code,
        redirectUri: "https://different-redirect-uri.com",
      });

      // assert
      expect(consumed).toBeNull();
    });

    it("returns null for non-existent authorization code", async () => {
      // arrange
      const mf = miniflareController.getMiniflare();
      const object = await getDefaultDurableObjectsFromMiniflare(mf);
      // Do not issue any code

      // act
      const consumed = await object.consume({
        clientId: "any-client-id",
        code: "non-existent-code",
        redirectUri: "https://any-redirect-uri.com",
      });

      // assert
      expect(consumed).toBeNull();
    });
  });

  describe("deleteExpired() method", () => {
    it("removes only expired authorization codes", async () => {
      // arrange
      const mf = miniflareController.getMiniflare();
      const object = await getDefaultDurableObjectsFromMiniflare(mf);

      const expiredCode1 = generateRandomAuthCode({
        expiresAt: Date.now() - 2000,
      });
      const expiredCode2 = generateRandomAuthCode({
        expiresAt: Date.now() - 1000,
      });
      const validCode = generateRandomAuthCode({
        expiresAt: Date.now() + 60000,
      });

      await object.issue(expiredCode1);
      await object.issue(expiredCode2);
      await object.issue(validCode);

      // act
      await object.deleteExpired();

      // assert - expired codes should be deleted
      const consumedExpired1 = await object.consume({
        clientId: expiredCode1.clientId,
        code: expiredCode1.code,
        redirectUri: expiredCode1.redirectUri,
      });
      expect(consumedExpired1).toBeNull();

      const consumedExpired2 = await object.consume({
        clientId: expiredCode2.clientId,
        code: expiredCode2.code,
        redirectUri: expiredCode2.redirectUri,
      });
      expect(consumedExpired2).toBeNull();

      // valid code should still be consumable
      const consumedValid = await object.consume({
        clientId: validCode.clientId,
        code: validCode.code,
        redirectUri: validCode.redirectUri,
      });
      expect(consumedValid).toBeDefined();
      expect(consumedValid?.consume).toBe(true);
    });

    it("keeps all codes when none are expired", async () => {
      // arrange
      const mf = miniflareController.getMiniflare();
      const object = await getDefaultDurableObjectsFromMiniflare(mf);

      const validCode1 = generateRandomAuthCode({
        expiresAt: Date.now() + 60000,
      });
      const validCode2 = generateRandomAuthCode({
        expiresAt: Date.now() + 60000,
      });
      const validCode3 = generateRandomAuthCode({
        expiresAt: Date.now() + 60000,
      });

      await object.issue(validCode1);
      await object.issue(validCode2);
      await object.issue(validCode3);

      // act
      await object.deleteExpired();

      // assert - all codes should still be consumable
      const consumed1 = await object.consume({
        clientId: validCode1.clientId,
        code: validCode1.code,
        redirectUri: validCode1.redirectUri,
      });
      expect(consumed1).toBeDefined();

      const consumed2 = await object.consume({
        clientId: validCode2.clientId,
        code: validCode2.code,
        redirectUri: validCode2.redirectUri,
      });
      expect(consumed2).toBeDefined();

      const consumed3 = await object.consume({
        clientId: validCode3.clientId,
        code: validCode3.code,
        redirectUri: validCode3.redirectUri,
      });
      expect(consumed3).toBeDefined();
    });

    it("handles empty store without errors", async () => {
      // arrange
      const mf = miniflareController.getMiniflare();
      const object = await getDefaultDurableObjectsFromMiniflare(mf);
      // Do not issue any codes

      // act & assert - should not throw
      await expect(object.deleteExpired()).resolves.toBeUndefined();
    });
  });

  describe("deleteAll() method", () => {
    it("clears all authorization codes from storage", async () => {
      // arrange
      const mf = miniflareController.getMiniflare();
      const object = await getDefaultDurableObjectsFromMiniflare(mf);

      const code1 = generateRandomAuthCode({
        expiresAt: Date.now() + 60000,
      });
      const code2 = generateRandomAuthCode({
        expiresAt: Date.now() + 60000,
      });
      const code3 = generateRandomAuthCode({
        expiresAt: Date.now() + 60000,
      });

      await object.issue(code1);
      await object.issue(code2);
      await object.issue(code3);

      // verify codes exist before deletion
      const beforeDelete = await object.consume({
        clientId: code1.clientId,
        code: code1.code,
        redirectUri: code1.redirectUri,
      });
      expect(beforeDelete).toBeDefined();

      // act
      await object.deleteAll();

      // assert - all codes should be deleted
      const consumed1 = await object.consume({
        clientId: code1.clientId,
        code: code1.code,
        redirectUri: code1.redirectUri,
      });
      expect(consumed1).toBeNull();

      const consumed2 = await object.consume({
        clientId: code2.clientId,
        code: code2.code,
        redirectUri: code2.redirectUri,
      });
      expect(consumed2).toBeNull();

      const consumed3 = await object.consume({
        clientId: code3.clientId,
        code: code3.code,
        redirectUri: code3.redirectUri,
      });
      expect(consumed3).toBeNull();
    });

    it("handles empty store gracefully", async () => {
      // arrange
      const mf = miniflareController.getMiniflare();
      const object = await getDefaultDurableObjectsFromMiniflare(mf);
      // Ensure empty by calling deleteAll first
      await object.deleteAll();

      // act & assert - should not throw
      await expect(object.deleteAll()).resolves.toBeUndefined();
    });
  });
});
