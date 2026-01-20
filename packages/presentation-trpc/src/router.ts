import { lazy } from "@trpc/server";
import { router } from "./trpc";

export const appRouter = router({
  createOrganization: lazy(() =>
    import("./routes/create-organization.route").then(
      (m) => m.createOrganizationRoute,
    ),
  ),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
