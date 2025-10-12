"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type {
  EnvironmentByProjectIdComposeStatus,
  EnvironmentByProjectIdComposeType,
} from "dokploy-sdk/models/operations";
import { Badge } from "@/shadcn/components/ui/badge";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import { ComposeStatusBadge } from "./components/compose-status-badge";
import { ServerActionDropdownContainer } from "./components/server-action-dropdown";

export type ServerTableRecord = {
  id: string; // compose id
  name: string; // compose name
  projectName: string;
  environment: string;
  status: EnvironmentByProjectIdComposeStatus;
  type: EnvironmentByProjectIdComposeType;
  description: string | null;
};

export const ServerTableColumns: ColumnDef<ServerTableRecord>[] = [
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
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
    enableHiding: false,
    header: "Compose Name",
    maxSize: 150,
    minSize: 150,
    size: 150,
  },
  {
    accessorKey: "projectName",
    cell: ({ row }) => <div>{row.original.projectName}</div>,
    header: "Project",
    maxSize: 70,
    minSize: 70,
    size: 70,
  },
  {
    accessorKey: "environment",
    cell: ({ row }) => (
      <Badge className="px-1.5 text-muted-foreground" variant="outline">
        {row.original.environment}
      </Badge>
    ),
    header: "Environment",
    maxSize: 100,
    minSize: 100,
    size: 100,
  },
  {
    accessorKey: "status",
    cell: ({ row }) => <ComposeStatusBadge type={row.original.status} />,
    header: "Status",
    maxSize: 90,
    minSize: 90,
    size: 90,
  },
  {
    accessorKey: "type",
    cell: ({ row }) => (
      <Badge className="px-1.5 text-muted-foreground" variant="outline">
        {row.original.type}
      </Badge>
    ),
    header: "Type",
    maxSize: 130,
    minSize: 130,
    size: 130,
  },
  {
    accessorKey: "description",
    cell: ({ row }) => (
      <div className="truncate text-muted-foreground text-sm">
        {row.original.description || "-"}
      </div>
    ),
    header: "Description",
    minSize: 300,
    size: 300,
  },
  {
    cell: ({ row }) => <ServerActionDropdownContainer record={row.original} />,
    id: "actions",
    maxSize: 40,
    minSize: 40,
    size: 40,
  },
] as const;
