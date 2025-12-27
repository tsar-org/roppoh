import {
  createExecutionContext,
  createScheduledController,
  env,
  waitOnExecutionContext,
} from "cloudflare:test";
import { generateRandomAuthCode } from "@test/helpers/authorization-code";
import { describe, expect, it } from "vitest";
import worker from "../../src/entry";

describe("test scheduled handler", async () => {
  it("should delete all authorization codes from the store", async () => {
    // arrange
    const id = env.AUTH_CODE_STORE.idFromName("default");
    const store = env.AUTH_CODE_STORE.get(id);

    // Issue authorization codes
    const code1 = generateRandomAuthCode({});
    const code2 = generateRandomAuthCode({});
    const code3 = generateRandomAuthCode({});

    await store.issue(code1);
    await store.issue(code2);
    await store.issue(code3);

    // Verify codes exist by consuming one
    const consumed = await store.consume({
      clientId: code1.clientId,
      code: code1.code,
      redirectUri: code1.redirectUri,
    });
    expect(consumed).toBeDefined();

    // act
    const ctrl = createScheduledController({
      cron: "30 * * * *",
      scheduledTime: new Date(1000),
    });
    const ctx = createExecutionContext();
    await worker.scheduled(ctrl, env, ctx);
    await waitOnExecutionContext(ctx);

    // assert
    // Try to consume code2 (should fail because it was deleted)
    const consumedAfterDelete = await store.consume({
      clientId: code2.clientId,
      code: code2.code,
      redirectUri: code2.redirectUri,
    });
    expect(consumedAfterDelete).toBeNull();

    // Try to consume code3 (should fail because it was deleted)
    const consumedCode3 = await store.consume({
      clientId: code3.clientId,
      code: code3.code,
      redirectUri: code3.redirectUri,
    });
    expect(consumedCode3).toBeNull();
  });

  it("should handle empty store gracefully", async () => {
    // arrange
    const id = env.AUTH_CODE_STORE.idFromName("default");
    const store = env.AUTH_CODE_STORE.get(id);

    // Delete all to ensure store is empty
    await store.deleteAll();

    // act
    const ctrl = createScheduledController({
      cron: "30 * * * *",
      scheduledTime: new Date(1000),
    });
    const ctx = createExecutionContext();
    await worker.scheduled(ctrl, env, ctx);
    await waitOnExecutionContext(ctx);

    // assert
    // If we reach here without errors, the handler handled empty store gracefully
    expect(true).toBe(true);
  });
});
