import { Hono } from "hono";
import { jwtVerify } from "jose";
import * as v from "valibot";
import {
  type Env,
  ServiceIdentifier,
} from "@/middlewares/dependency-injection";
import type { KeyPairService } from "@/services/keypair-service";
import { invalidToken } from "@/utils/error-response";
import { oidcValidator } from "@/utils/oidc-validator";

const userinfoHeaderSchema = v.object({
  authorization: v.pipe(
    v.string(),
    v.regex(
      /^Bearer .+$/,
      "Authorization header must be in format: Bearer <token>",
    ),
  ),
});

export const userinfoRoute = new Hono<Env>().get(
  "",
  oidcValidator("header", userinfoHeaderSchema),
  async (c) => {
    // di
    const keyPairService = await c.env.container.getAsync<KeyPairService>(
      ServiceIdentifier.KEY_PAIR_SERVICE,
    );

    // parse request
    const { authorization } = c.req.valid("header");
    const token = authorization.substring(7);

    try {
      const keyPair = await keyPairService.loadOrGenerate(c.env.KV);
      const verified = await jwtVerify(token, keyPair.publicKey);

      const userInfo = {
        email: verified.payload.email,
        email_verified: verified.payload.email_verified,
        name: verified.payload.name,
        picture: verified.payload.picture,
        preferred_username: verified.payload.preferred_username,
        sub: verified.payload.sub,
      };

      return c.json(userInfo);
    } catch (error) {
      console.error("JWT verification failed:", error);
      c.header("WWW-Authenticate", 'Bearer error="invalid_token"');
      return invalidToken(c, "Invalid or expired token");
    }
  },
);
