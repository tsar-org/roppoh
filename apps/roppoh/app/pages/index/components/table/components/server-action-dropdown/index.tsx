import type { Server } from "@/features/dokploy-server-management";
import { useI18nContext } from "@/i18n/i18n-react";
import { getDokployClient } from "@/libs/dokploy-sdk/dokploy.client";
import { ServerActionDropdownView } from "./components/dropdown";
import { useServerControl } from "./hooks/use-server-control.client";

type Props = {
  server: Server;
};

export const ServerActionDropdownContainer = ({ server }: Props) => {
  const { LL } = useI18nContext();
  const dokployClient = getDokployClient();
  const { execute, isProcessing } = useServerControl();
  const composeId = server.status === "fetched" ? server.compose.composeId : "";

  const onClickStart = () =>
    execute({
      apiCall: () => dokployClient.compose.start({ composeId }),
      error: LL.top.table.serverActionDropdown.start.error(),
      loading: LL.top.table.serverActionDropdown.start.loading(),
      success: LL.top.table.serverActionDropdown.start.success(),
    });

  const onClickStop = () =>
    execute({
      apiCall: () => dokployClient.compose.stop({ composeId }),
      error: LL.top.table.serverActionDropdown.stop.error(),
      loading: LL.top.table.serverActionDropdown.stop.loading(),
      success: LL.top.table.serverActionDropdown.stop.success(),
    });

  const onClickReDeploy = () =>
    execute({
      apiCall: () => dokployClient.compose.redeploy({ composeId }),
      error: LL.top.table.serverActionDropdown.redeploy.error(),
      loading: LL.top.table.serverActionDropdown.redeploy.loading(),
      success: LL.top.table.serverActionDropdown.redeploy.success(),
    });

  return (
    <ServerActionDropdownView
      isProcessingServerControl={isProcessing}
      onClickReDeploy={onClickReDeploy}
      onClickStart={onClickStart}
      onClickStop={onClickStop}
      server={server}
    />
  );
};
