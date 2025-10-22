import type { FetchQueryOptions } from "@tanstack/react-query";
import { DokployError, isDokployError } from "@/libs/dokploy-sdk/error";
import type { DokployQueryOptionBase } from "./type";

export const environmentByProjectIdQueryOption = ({
  dokployClient,
  projectId,
}: DokployQueryOptionBase & { projectId: string }) =>
  ({
    queryFn: async () => {
      const res = await dokployClient.environment.byProjectId({ projectId });
      if (isDokployError(res)) throw new DokployError(res);
      return res;
    },
    queryKey: ["environment.byProjectId", projectId],
  }) satisfies FetchQueryOptions;
