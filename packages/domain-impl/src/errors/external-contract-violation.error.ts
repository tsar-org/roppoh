import type { ExternalContractViolationError } from "@roppoh/domain";

export class ExternalContractViolationErrorImpl
  extends Error
  implements ExternalContractViolationError
{
  public readonly externalDependencyName;
  public readonly contract;
  public readonly response: Response;

  public constructor({
    externalDependencyName,
    contract,
    response,
  }: {
    externalDependencyName: ExternalContractViolationError["externalDependencyName"];
    contract: ExternalContractViolationError["contract"];
    response: Response;
  }) {
    const message = `External dependency '${externalDependencyName}' violated contract: ${contract}`;
    super(message);
    this.externalDependencyName = externalDependencyName;
    this.contract = contract;
    this.response = response;
  }
}
