import { Brand, type Effect } from "effect";
import type { Organization } from "../organization";

// Define branded type
type UserId = string & Brand.Brand<"UserId">;
export const userId = Brand.nominal<UserId>();

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface User {
  // Property
  readonly id: UserId;
  readonly name: string;
  readonly email: string;
  readonly image: string;
  readonly organizationId: Organization["id"];
  readonly role: UserRole | undefined;

  // Association
  organization?: () => Effect.Effect<Organization, never, never>;
}
