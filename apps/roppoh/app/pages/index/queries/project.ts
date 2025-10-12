import type { FetchQueryOptions } from "@tanstack/react-query";
import type { Dokploy } from "dokploy-sdk";
import { DokployError, isDokployError } from "@/libs/dokploy-sdk/error";

interface DokployQueryOptionBase {
  dokployClient: Dokploy;
}

export const projectAllQueryOption = ({
  dokployClient,
}: DokployQueryOptionBase) =>
  ({
    queryFn: async () => {
      const res = await dokployClient.project.getAll();
      if (isDokployError(res)) throw new DokployError(res);
      return res;
    },
    queryKey: ["project.getAll"],
  }) satisfies FetchQueryOptions;

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
