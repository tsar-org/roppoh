import type { Effect } from "effect";
import type { Organization } from "./organization.entity";

export interface OrganizationFactory {
  reConstructor: (args: {
    id: string;
    name: string;
    image: string;
  }) => Effect.Effect<Organization, never, never>;
}
