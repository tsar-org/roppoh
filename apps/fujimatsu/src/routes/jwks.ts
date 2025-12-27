import { Hono } from "hono";
import type { KeyPairService } from "@/services/keypair-service";
import type { Env } from "../middlewares/dependency-injection";
import { serverError } from "../utils/error-response";

export const jwksRoute = new Hono<Env>().get("", async (c) => {
  const keyPairService =
    await c.env.container.getAsync<KeyPairService>("keyPairService");

  try {
    const keyPair = await keyPairService.loadOrGenerate(c.env.KV);

    if (!keyPair) {
      return serverError(c, "Failed to load keypair");
    }

    const publicKeyJwk = await keyPairService.exportPublicKeyAsJWK(
      keyPair.publicKey,
    );

    return c.json({
      keys: [
        {
          alg: "RS256",
          kid: "jwtRS256",
          use: "sig",
          ...publicKeyJwk,
        },
      ],
    });
  } catch (error) {
    console.error("KeyPair operation failed:", error);
    return serverError(c, "Failed to load or generate keypair");
  }
});
