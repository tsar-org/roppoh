import type { ColumnDef } from "@tanstack/react-table";
import type { Server } from "@/features/dokploy-server-management";
import { Badge } from "@/shadcn/components/ui/badge";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import { Skeleton } from "@/shadcn/components/ui/skeleton";
import { ComposeStatusBadge } from "./components/compose-status-badge";
import { ServerActionDropdownContainer } from "./components/server-action-dropdown";

export const ServerTableColumns: ColumnDef<Server>[] = [
  {
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          aria-label="Select row"
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        />
      </div>
    ),
    enableHiding: false,
    enableSorting: false,
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          aria-label="Select all"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          className="border-foreground/20"
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
        />
      </div>
    ),
    id: "select",
    maxSize: 50,
    minSize: 50,
    size: 50,
  },
  {
    accessorKey: "name",
    cell: ({ row }) => {
      if (row.original.status === "fetching")
        return <Skeleton className="h-6 w-[150px]" />;

      return <div className="font-medium">{row.original.compose.name}</div>;
    },
    enableHiding: false,
    header: "Compose Name",
    maxSize: 150,
    minSize: 150,
    size: 150,
  },
  {
    accessorKey: "projectName",
    cell: ({ row }) => {
      if (row.original.status === "fetching")
        return <Skeleton className="h-6 w-[80px]" />;

      return <div>{row.original.project.name}</div>;
    },
    header: "Project",
    maxSize: 80,
    minSize: 80,
    size: 80,
  },
  {
    accessorKey: "environment",
    cell: ({ row }) => {
      if (row.original.status === "fetching")
        return <Skeleton className="h-6 w-[100px]" />;

      return (
        <Badge className="px-1.5 text-muted-foreground" variant="outline">
          {row.original.environment.name}
        </Badge>
      );
    },
    header: "Environment",
    maxSize: 100,
    minSize: 100,
    size: 100,
  },
  {
    accessorKey: "status",
    cell: ({ row }) => {
      if (row.original.status === "fetching")
        return <Skeleton className="h-6 w-[90px]" />;

      return <ComposeStatusBadge type={row.original.compose.composeStatus} />;
    },
    header: "Status",
    maxSize: 90,
    minSize: 90,
    size: 90,
  },
  {
    accessorKey: "type",
    cell: ({ row }) => {
      if (row.original.status === "fetching")
        return <Skeleton className="h-6 w-[130px]" />;

      return (
        <Badge className="px-1.5 text-muted-foreground" variant="outline">
          {row.original.compose.composeType}
        </Badge>
      );
    },
    header: "Type",
    maxSize: 130,
    minSize: 130,
    size: 130,
  },
  {
    accessorKey: "description",
    cell: ({ row }) => {
      if (row.original.status === "fetching")
        return <Skeleton className="h-6 w-[300px]" />;

      return (
        <div className="truncate text-muted-foreground text-sm">
          {row.original.compose.description || "-"}
        </div>
      );
    },
    header: "Description",
    minSize: 300,
    size: 300,
  },
  {
    cell: ({ row }) => <ServerActionDropdownContainer server={row.original} />,
    id: "actions",
    maxSize: 40,
    minSize: 40,
    size: 40,
  },
] as const;
