import type { Organization } from "@roppoh/domain";

export class OrganizationImpl implements Organization {
  readonly id: string;
  readonly name: string;
  readonly image: string;

  public constructor(args: Organization) {
    this.id = args.id;
    this.name = args.name;
    this.image = args.image;
  }
}
