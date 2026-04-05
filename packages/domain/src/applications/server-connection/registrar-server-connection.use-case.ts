import type { ServerConnectionFactory } from "@roppoh/domain/domains/server-connection/server-connection.factory";
import type { ServerConnectionPolicy } from "@roppoh/domain/domains/server-connection/server-connection.policy";
import type { EffectCompose } from "@roppoh/domain/types/compose";

export interface RegistrarServerConnectionUseCase {
  invoke: () => EffectCompose<
    [ServerConnectionPolicy["createByUser"], ServerConnectionFactory["create"]]
  >;
}
