import { ExternalDependencyFailureErrorImpl } from "@domain-impl/errors/external-dependency-failure.error";

export class DokployResponseError extends ExternalDependencyFailureErrorImpl {
  public readonly response: Response;

  public constructor({
    response,
  }: {
    response: Response;
  }) {
    super({ externalDependencyName: "dokploy" });
    this.response = response;
    this.message = `Dokploy server error: ${response.status} ${response.statusText}`;
  }
}
