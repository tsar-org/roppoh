import { useQueries, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getDokployClient } from "@/libs/dokploy-sdk/dokploy.client";
import { environmentByProjectIdQueryOption } from "@/libs/react-query/options/dokploy/environment";
import { projectAllQueryOption } from "@/libs/react-query/options/dokploy/project";
import type { Server } from "../type";

type Result = {
  servers: Server[];
};

export const useServers = (): Result => {
  const dokployClient = getDokployClient();

  const projectListQuery = useQuery(projectAllQueryOption({ dokployClient }));
  const environmentQueries = useQueries({
    queries: (projectListQuery.data ?? []).map((project) =>
      environmentByProjectIdQueryOption({
        dokployClient: dokployClient,
        projectId: project.projectId,
      }),
    ),
  });

  const servers = useMemo(() => {
    if (projectListQuery.isLoading || projectListQuery.data === undefined)
      return [{ status: "fetching" as const }];

    return environmentQueries
      .flatMap((query) => query.data ?? [])
      .flatMap((env) =>
        env.compose.map((cps) => ({
          compose: cps,
          environment: env,
          project: env.project,
          status: "fetched" as const,
        })),
      );
  }, [projectListQuery, environmentQueries]);

  return {
    servers,
  };
};
