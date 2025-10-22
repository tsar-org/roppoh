import type { FetchQueryOptions } from "@tanstack/react-query";
import { DokployError, isDokployError } from "@/libs/dokploy-sdk/error";
import type { DokployQueryOptionBase } from "./type";

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
