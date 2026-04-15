import { Hono } from "hono";

import { betterAuthCorsMiddleware, injectDependenciesMiddleware } from "./middlewares";
import { betterAuthRoute, health } from "./routes";
import { openidConfigurationRoute } from "./routes/.well-known/openid-configuration";

export const app = new Hono()
  // health
  .route("/health", health)
  // middleware
  .use("*", injectDependenciesMiddleware)
  .use("*", betterAuthCorsMiddleware)
  // .use("/api/auth/*", betterAuthCorsMiddleware)
  // .use("/.well-known/*", betterAuthCorsMiddleware)
  // handler
  .route("/.well-known/openid-configuration", openidConfigurationRoute)
  .route("*", betterAuthRoute);
