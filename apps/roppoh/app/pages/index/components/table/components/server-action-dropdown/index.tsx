import type { Server } from "@/features/dokploy-server-management";
import { getDokployClient } from "@/libs/dokploy-sdk/dokploy.client";
import { ServerActionDropdownView } from "./components/dropdown";
import { useServerControl } from "./hooks/use-server-control.client";

type Props = {
  server: Server;
};

export const ServerActionDropdownContainer = ({ server }: Props) => {
  const dokployClient = getDokployClient();
  const { execute, isProcessing } = useServerControl();
  const composeId = server.status === "fetched" ? server.compose.composeId : "";

  const onClickStart = () =>
    execute({
      apiCall: () => dokployClient.compose.start({ composeId }),
      error: "❌ Failed to start server. Please try again.",
      loading: "🚀 Launching server...",
      success: "✨ Server is up and running!",
    });

  const onClickStop = () =>
    execute({
      apiCall: () => dokployClient.compose.stop({ composeId }),
      error: "❌ Failed to stop server. Please try again.",
      loading: "⏹️ Stopping server...",
      success: "✅ Server stopped successfully",
    });

  const onClickReDeploy = () =>
    execute({
      apiCall: () => dokployClient.compose.redeploy({ composeId }),
      error: "❌ Failed to redeploy server. Please try again.",
      loading: "🔄 Redeploying server...",
      success: "🎉 Server redeployed successfully!",
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
