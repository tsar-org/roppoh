import type {
  Organization,
  OrganizationFactory,
  OrganizationPolicy,
} from "@domain/domains/organization";
import type { User } from "@domain/domains/user";
import type { Compose } from "@domain/types/compose";

export interface CreateOrganizationUseCase {
  readonly organizationFactory: OrganizationFactory;
  readonly organizationPolicy: OrganizationPolicy;

  invoke: (args: {
    user: User;
    organization: Organization;
  }) => Compose<
    [
      OrganizationPolicy["canCreateOrganizationByUser"],
      OrganizationFactory["create"],
    ]
  >;
}
