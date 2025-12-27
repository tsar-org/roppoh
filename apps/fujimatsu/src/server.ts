import { Hono } from "hono";
import {
  type Env,
  injectDependenciesMiddleware,
} from "./middlewares/dependency-injection";
import { authorizeRoute } from "./routes/authorize";
import { callbackRoute } from "./routes/callback";
import { discoveryRoute } from "./routes/discovery";
import { health } from "./routes/health";
import { jwksRoute } from "./routes/jwks";
import { tokenRoute } from "./routes/token";
import { userinfoRoute } from "./routes/userinfo";

export const app = new Hono<Env>()
  // middleware
  .use("*", injectDependenciesMiddleware)
  // health
  .route("/health", health)
  // oidc route
  .route("/.well-known/openid-configuration", discoveryRoute)
  .route("/authorize", authorizeRoute)
  .route("/callback", callbackRoute)
  .route("/jwks.json", jwksRoute)
  .route("/token", tokenRoute)
  .route("/userinfo", userinfoRoute);
