import { Hono } from "hono";

import { betterAuthCorsMiddleware, injectDependenciesMiddleware } from "./middlewares";
import { betterAuthRoute, health } from "./routes";
import { openidConfigurationRoute } from "./routes/.well-known/openid-configuration";

export const app = new Hono()
  .get("/", (c) => c.redirect("/sign-in"))
  .route("/health", health)
  // middleware
  .use("*", injectDependenciesMiddleware)
  .use("*", betterAuthCorsMiddleware)
  // handler
  .route("/api/.well-known/openid-configuration", openidConfigurationRoute)
  .route("/api/*", betterAuthRoute);
