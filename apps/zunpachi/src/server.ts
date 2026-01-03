import { Hono } from "hono";
import {
  betterAuthCorsMiddleware,
  injectDependenciesMiddleware,
} from "./middlewares";
import { health } from "./routes/health";
import { betterAuthRoute } from "./routes/v1/better-auth";

export const app = new Hono()
  // middleware
  .use("*", injectDependenciesMiddleware)
  .use("/api/v1/better-auth/*", betterAuthCorsMiddleware)
  // health
  .route("/health", health)
  // v1
  .route("/api/v1/better-auth/*", betterAuthRoute);
