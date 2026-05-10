import type { OAuthClient } from "@better-auth/oauth-provider";
import type { Prettify } from "better-auth";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { auth } from "@/libs/better-auth";

import { BetterAuthError } from "../error";
import { USE_OIDC_CLIENTS_KEY as USE_CLIENTS_KEY } from "./use-clients";

interface Args {
  onError?: (args: { error: Error; variables: Prettify<OAuthClient> }) => void | Promise<void>;
  onSuccess?: (args: { variables: Prettify<OAuthClient> }) => void | Promise<void>;
}

export const useDeleteClientMutation = (args: Args) => {
  const query = useQueryClient();

  const mutationFn = async (
    params: Parameters<NonNullable<(typeof auth)["oauth2"]["deleteClient"]>>[0],
  ) => {
    const { data, error } = await auth.oauth2.deleteClient(params);

    if (error) {
      console.log(error);
      throw new BetterAuthError(error);
    }

    return data;
  };

  return useMutation({
    mutationFn,
    onError: async (error, variables, onMutateResult, context) => {
      console.error({ context, error, onMutateResult, variables });
      await args.onError?.({ error, variables });
    },
    onSuccess: async (data, variables) => {
      await query.invalidateQueries({ queryKey: [USE_CLIENTS_KEY] });
      await args.onSuccess?.({ variables });
    },
  });
};
