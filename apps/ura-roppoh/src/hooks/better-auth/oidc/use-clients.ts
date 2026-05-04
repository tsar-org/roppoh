import { useQuery } from "@tanstack/react-query";

import { auth } from "@/libs/better-auth";

import { BetterAuthError } from "../error";

export const USE_OIDC_CLIENTS_KEY = "better-auth-use-oidc-clients" as const;

export const useOidcClients = () => {
  const queryFn = async () => {
    const { data, error } = await auth.oauth2.getClients();

    if (error) {
      console.log(error);
      throw new BetterAuthError(error);
    }

    return data;
  };

  return useQuery<Awaited<ReturnType<typeof queryFn>>, BetterAuthError>({
    queryKey: [USE_OIDC_CLIENTS_KEY],
    queryFn,
  });
};
