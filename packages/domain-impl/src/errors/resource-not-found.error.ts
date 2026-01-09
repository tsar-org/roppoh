import type { ResourceNotFoundError } from "@roppoh/domain";

export class ResourceNotFoundErrorImpl
  extends Error
  implements ResourceNotFoundError
{
  public readonly resourceType: string;
  public readonly resourceId: string;

  public constructor(args: { resourceType: string; resourceId: string }) {
    super(`${args.resourceType} with id ${args.resourceId} not found`);
    this.resourceType = args.resourceType;
    this.resourceId = args.resourceId;
  }
}
