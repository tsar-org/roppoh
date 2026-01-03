import {
  OrganizationFactoryImpl,
  OrganizationPolicyImple,
} from "@domain-impl/domains/organization";
import type {
  CreateOrganizationUseCase,
  Organization,
  OrganizationFactory,
  OrganizationPolicy,
  User,
} from "@roppoh/domain";
import { Effect } from "effect";
import { inject, LazyServiceIdentifier } from "inversify";

export class CreateOrganizationUseCaseImpl
  implements CreateOrganizationUseCase
{
  public constructor(
    @inject(new LazyServiceIdentifier(() => OrganizationFactoryImpl))
    public readonly organizationFactory: OrganizationFactory,
    @inject(new LazyServiceIdentifier(() => OrganizationPolicyImple))
    public readonly organizationPolicy: OrganizationPolicy,
  ) {}

  invoke = (args: { user: User; organization: Organization }) =>
    Effect.gen(this, function* () {
      yield* this.organizationPolicy.canCreateOrganizationByUser({
        user: args.user,
      });

      const organization = yield* this.organizationFactory.create(
        args.organization,
      );

      return organization;
    });
}
