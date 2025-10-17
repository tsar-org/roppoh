import type { UseQueryResult } from "@tanstack/react-query";
import type {
  EnvironmentByProjectIdResponseBody,
  ProjectAllResponseBody,
} from "dokploy-sdk/models/operations";
import { useMemo } from "react";
import type { ServerTableRecord } from "../components/table/columns";

type Args = {
  projectList: ProjectAllResponseBody[] | undefined;
  environmentQueries: UseQueryResult<
    EnvironmentByProjectIdResponseBody[],
    Error
  >[];
};

type Result = {
  tableData: ServerTableRecord[];
};

export const useTableData = ({
  projectList,
  environmentQueries,
}: Args): Result => {
  const tableData = useMemo(() => {
    if (projectList === undefined) return [];

    return environmentQueries
      .flatMap((query) => query.data ?? [])
      .flatMap((env) =>
        env.compose.map((cps) => ({
          description: cps.description,
          environment: env.name,
          id: cps.composeId,
          name: cps.name,
          projectName: env.project.name,
          status: cps.composeStatus,
          type: cps.composeType,
        })),
      );
  }, [projectList, environmentQueries]);

  return { tableData };
};
