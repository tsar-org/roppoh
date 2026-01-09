import type { Organization, OrganizationFactory } from "@roppoh/domain";
import { Effect } from "effect";
import { OrganizationImpl } from "./organization.entity";

export class OrganizationFactoryImpl implements OrganizationFactory {
  public create = (args: Organization) =>
    Effect.gen(this, function* () {
      return yield* Effect.succeed(new OrganizationImpl(args));
    });
}
