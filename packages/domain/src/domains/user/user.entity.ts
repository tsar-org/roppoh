import type { Effect } from "effect";
import type { Organization } from "../organization";

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface User {
  // Property
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly image: string;
  readonly organizationId: string;
  readonly role: UserRole | undefined;

  // Association
  organization?: () => Effect.Effect<Organization, never, never>;
}
