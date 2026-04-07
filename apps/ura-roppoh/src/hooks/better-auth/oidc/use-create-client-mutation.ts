import type { OAuthClient } from "@better-auth/oauth-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Prettify } from "better-auth";

import { authClient } from "@/libs/better-auth";

import { BetterAuthError } from "../error";
import { KEY as USE_CLIENTS_KEY } from "./use-clients";

interface Args {
  onError?: (args: { error: Error; variables: Prettify<OAuthClient> }) => void | Promise<void>;
  onSuccess?: (args: {
    data: OAuthClient;
    variables: Prettify<OAuthClient>;
  }) => void | Promise<void>;
}

export const useCreateClientMutation = (args: Args) => {
  const query = useQueryClient();

  const mutationFn = async (
    args: Parameters<NonNullable<(typeof authClient)["oauth2"]["createClient"]>>[0],
  ) => {
    const { data, error } = await authClient.oauth2.createClient(args);

    if (error) {
      console.log(error);
      throw new BetterAuthError(error);
    }

    return data;
  };

  return useMutation({
    mutationFn: mutationFn,
    onError: async (error, variables, onMutateResult, context) => {
      console.error({ error, variables, onMutateResult, context });
      await args.onError?.({ error, variables });
    },
    onSuccess: async (data, variables) => {
      query.invalidateQueries({ queryKey: [USE_CLIENTS_KEY] });
      await args.onSuccess?.({ data, variables });
    },
  });
};
