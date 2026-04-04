import { Hono } from "hono";

import { betterAuthCorsMiddleware, injectDependenciesMiddleware } from "./middlewares";
import { betterAuthRoute, health } from "./routes";

export const app = new Hono()
  // health
  .route("/health", health)
  // middleware
  .use("*", injectDependenciesMiddleware)
  .use("/api/auth/*", betterAuthCorsMiddleware)
  // handler
  .route("/api/auth/*", betterAuthRoute);
