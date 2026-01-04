import type { ExternalDependencyFailureError } from "@roppoh/domain";

export class ExternalDependencyFailureErrorImpl
  extends Error
  implements ExternalDependencyFailureError
{
  readonly externalDependencyName: string;

  public constructor({
    externalDependencyName,
  }: { externalDependencyName: string }) {
    const message = `External dependency '${externalDependencyName}' failed`;
    super(message);
    this.externalDependencyName = externalDependencyName;
  }
}
