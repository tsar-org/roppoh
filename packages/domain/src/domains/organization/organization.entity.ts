import { Brand } from "effect";

// Define branded type
type OrganizationId = string & Brand.Brand<"OrganizationId">;
export const organizationId = Brand.nominal<OrganizationId>();

export interface Organization {
  // Property
  readonly id: OrganizationId;
  readonly name: string;
  readonly image: string;
}
