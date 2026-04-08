import { Badge } from "@roppoh/shadcn/components/ui/badge";

interface Props {
  disabled: boolean | undefined;
}

export const ClientStatus = (props: Props) => {
  switch (props.disabled) {
    case true:
      return (
        <Badge variant="outline">
          <span className="size-2 rounded-full bg-green-500" />
          Enable
        </Badge>
      );
    case false:
      return (
        <Badge variant="outline">
          <span className="size-2 rounded-full bg-gray-500" />
          Disabled
        </Badge>
      );
    case undefined:
      return (
        <Badge variant="outline">
          <span className="size-2 rounded-full bg-yellow-500" />
          Undefined
        </Badge>
      );
  }
};
