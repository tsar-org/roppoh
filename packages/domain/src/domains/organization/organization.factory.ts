import type { Effect } from "effect";
import type { Organization } from "./organization.entity";

export interface OrganizationFactory {
  create: (args: Organization) => Effect.Effect<Organization, never, never>;
}
