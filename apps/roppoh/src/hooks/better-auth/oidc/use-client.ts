import { useQuery } from "@tanstack/react-query";

import { authClient } from "@/libs/better-auth";

import { BetterAuthError } from "../error";

const USE_OIDC_CLIENT_KEY = "better-auth-use-oidc-client" as const;

interface Args {
  client_id: string | undefined | null;
}

export const useOidcClient = (args: Args) => {
  const queryFn = async () => {
    const { data, error } = await authClient.oauth2.getClient({
      query: { client_id: args.client_id! },
    });

    if (error) {
      console.log(error);
      throw new BetterAuthError(error);
    }

    return data;
  };

  return useQuery<Awaited<ReturnType<typeof queryFn>>, BetterAuthError>({
    queryKey: [USE_OIDC_CLIENT_KEY, args.client_id],
    queryFn,
    enabled: !!args.client_id,
  });
};
