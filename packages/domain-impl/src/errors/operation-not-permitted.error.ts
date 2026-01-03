import type { OperationNotPermittedError } from "@roppoh/domain";

export class OperationNotPermittedErrorImpl
  extends Error
  implements OperationNotPermittedError
{
  readonly operation: string;
  readonly reason: string;

  public constructor(args: { operation: string; reason: string }) {
    super();
    this.operation = args.operation;
    this.reason = args.reason;
    this.message = `Operation is not permitted. operation: ${this.operation}reason: ${this.reason}`;
  }
}
