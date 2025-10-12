import { EnvironmentByProjectIdComposeStatus } from "dokploy-sdk/models/operations";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import type { ServerTableRecord } from "../../../columns";

type Props = {
  record: ServerTableRecord;
  isProcessingServerControl: boolean;
  onClickStart: () => void;
  onClickStop: () => void;
  onClickReDeploy: () => void;
};

export const ServerActionDropdownView = (props: Props) => {
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
            disabled={
              // serverが停止中(idle)状態のみ押下可能
              props.record.status !==
                EnvironmentByProjectIdComposeStatus.Idle ||
              props.isProcessingServerControl
            }
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
            disabled={
              // serverが稼働中(done or running)状態のみ押下可能
              !(
                props.record.status ===
                  EnvironmentByProjectIdComposeStatus.Done ||
                props.record.status ===
                  EnvironmentByProjectIdComposeStatus.Running
              ) || props.isProcessingServerControl
            }
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
            disabled={props.isProcessingServerControl}
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
