import type { ColumnDef } from "@tanstack/react-table";
import type { Server } from "@/features/dokploy-server-management";
import type { TranslationFunctions } from "@/i18n/i18n-types";
import { Badge } from "@/shadcn/components/ui/badge";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import { Skeleton } from "@/shadcn/components/ui/skeleton";
import { ComposeStatusBadge } from "./components/compose-status-badge";
import { ServerActionDropdownContainer } from "./components/server-action-dropdown";

export const ServerTableColumns = (
  LL: TranslationFunctions,
): ColumnDef<Server>[] =>
  [
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
      enableResizing: true,
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
      size: 50,
    },
    {
      accessorKey: "name",
      cell: ({ row }) => {
        if (row.original.status === "fetching")
          return <Skeleton className="h-6 w-[150px]" />;

        return (
          <div className="truncate font-medium">
            {row.original.compose.name}
          </div>
        );
      },
      enableHiding: false,
      enableResizing: true,
      header: LL.top.table.column.composeName(),
      size: 200,
    },
    {
      accessorKey: "project",
      cell: ({ row }) => {
        if (row.original.status === "fetching")
          return <Skeleton className="h-6 w-20" />;

        return <div>{row.original.project.name}</div>;
      },
      enableResizing: true,
      header: () => <p className="pr-4">{LL.top.table.column.project()}</p>,
      size: 110,
    },
    {
      accessorKey: "environment",
      cell: ({ row }) => {
        if (row.original.status === "fetching")
          return <Skeleton className="h-6 w-[100px]" />;

        return (
          <Badge
            className="truncate px-1.5 text-muted-foreground"
            variant="outline"
          >
            {row.original.environment.name}
          </Badge>
        );
      },
      enableResizing: true,
      header: LL.top.table.column.environment(),
      size: 100,
    },
    {
      accessorKey: "status",
      cell: ({ row }) => {
        if (row.original.status === "fetching")
          return <Skeleton className="h-6 w-[90px]" />;

        return <ComposeStatusBadge type={row.original.compose.composeStatus} />;
      },
      enableResizing: true,
      header: LL.top.table.column.status(),
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
      enableResizing: true,
      header: LL.top.table.column.type(),
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
      enableResizing: true,
      header: LL.top.table.column.description(),
      minSize: 300,
      size: 300,
    },
    {
      cell: ({ row }) => (
        <ServerActionDropdownContainer server={row.original} />
      ),
      id: "actions",
      size: 40,
    },
  ] as const;
