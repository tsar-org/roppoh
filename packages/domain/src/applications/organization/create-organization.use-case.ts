import type {
  Organization,
  OrganizationFactory,
  OrganizationPolicy,
} from "@domain/domains/organization";
import type { User } from "@domain/domains/user";
import type { EffectCompose } from "@domain/types/compose";

export interface CreateOrganizationUseCase {
  readonly organizationFactory: OrganizationFactory;
  readonly organizationPolicy: OrganizationPolicy;

  invoke: (args: {
    user: User;
    organization: Organization;
  }) => EffectCompose<
    [
      OrganizationPolicy["canCreateOrganizationByUser"],
      OrganizationFactory["create"],
    ]
  >;
}
