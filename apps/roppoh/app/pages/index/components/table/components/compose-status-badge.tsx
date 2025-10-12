import { EnvironmentByProjectIdComposeStatus } from "dokploy-sdk/models/operations";
import { BadgeCheck, CirclePause, CircleX } from "lucide-react";
import type { JSX } from "react";
import { Badge } from "@/shadcn/components/ui/badge";

type Props = {
  type: EnvironmentByProjectIdComposeStatus;
};

const StatusIcon = (props: Props): JSX.Element => {
  switch (props.type) {
    case EnvironmentByProjectIdComposeStatus.Running:
    case EnvironmentByProjectIdComposeStatus.Done:
      return (
        <>
          <BadgeCheck color="#04DF72" />
          {props.type}
        </>
      );
    case EnvironmentByProjectIdComposeStatus.Error:
      return (
        <>
          <CircleX color="#ff0000" />
          {props.type}
        </>
      );
    case EnvironmentByProjectIdComposeStatus.Idle:
      return (
        <>
          <CirclePause />
          stopped
        </>
      );
  }
};

export const ComposeStatusBadge = (props: Props) => {
  return (
    <Badge className="px-1.5 text-muted-foreground" variant="outline">
      <StatusIcon type={props.type} />
    </Badge>
  );
};
