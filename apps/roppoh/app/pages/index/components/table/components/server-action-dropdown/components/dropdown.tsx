import { EnvironmentByProjectIdComposeStatus } from "dokploy-sdk/models/operations";
import { EllipsisVertical } from "lucide-react";
import type { Server } from "@/features/dokploy-server-management";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";

type Props = {
  server: Server;
  isProcessingServerControl: boolean;
  onClickStart: () => void;
  onClickStop: () => void;
  onClickReDeploy: () => void;
};

export const ServerActionDropdownView = (props: Props) => {
  const isStartButtonDisabled =
    props.server.status === "fetching" ||
    // serverが停止中(idle)状態のみ押下可能
    props.server.compose.composeStatus !==
      EnvironmentByProjectIdComposeStatus.Idle ||
    props.isProcessingServerControl;

  const isStopButtonDisabled =
    props.server.status === "fetching" ||
    // serverが稼働中(done or running)状態のみ押下可能
    !(
      props.server.compose.composeStatus ===
        EnvironmentByProjectIdComposeStatus.Done ||
      props.server.compose.composeStatus ===
        EnvironmentByProjectIdComposeStatus.Running
    ) ||
    props.isProcessingServerControl;

  const isReDeployButtonDisabled =
    props.server.status === "fetching" || props.isProcessingServerControl;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
          size="icon"
          variant="ghost"
        >
          <EllipsisVertical />
          <span className="sr-only"> Open menu </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem>
          <Button
            className="h-[20px] w-full justify-start"
            disabled={isStartButtonDisabled}
            onClick={props.onClickStart}
            size="icon"
            variant={"ghost"}
          >
            Start
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            className="h-[20px] w-full justify-start"
            disabled={isStopButtonDisabled}
            onClick={props.onClickStop}
            size="icon"
            variant={"ghost"}
          >
            Stop
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            className="h-[20px] w-full justify-start"
            disabled={isReDeployButtonDisabled}
            onClick={props.onClickReDeploy}
            size="icon"
            variant={"ghost"}
          >
            ReDeploy
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
