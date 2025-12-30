import { Hono } from "hono";
import {
  type Env,
  ServiceIdentifier,
} from "@/middlewares/dependency-injection";
import type { KeyPairService } from "@/services/keypair-service";
import { serverError } from "@/utils/error-response";

export const jwksRoute = new Hono<Env>().get("", async (c) => {
  // di
  const keyPairService = await c.env.container.getAsync<KeyPairService>(
    ServiceIdentifier.KEY_PAIR_SERVICE,
  );

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
