import { useQuery } from "@tanstack/react-query";

import { authClient } from "@/libs/better-auth";

import { BetterAuthError } from "../error";

export const KEY = "better-auth-use-oidc-clients" as const;

export const useOidcClient = () => {
  const queryFn = async () => {
    const { data, error } = await authClient.oauth2.getClients();

    if (error) {
      console.log(error);
      throw new BetterAuthError(error);
    }

    return data;
  };

  return useQuery<Awaited<ReturnType<typeof queryFn>>, BetterAuthError>({
    queryKey: [KEY],
    queryFn,
  });
};
