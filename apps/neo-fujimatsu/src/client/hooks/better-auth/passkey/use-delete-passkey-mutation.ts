import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authClient } from "@/client/libs/better-auth";

import { BetterAuthError } from "../error";
import { USE_USER_PASSKEYS_KEY } from "./use-user-passkeys";

type Variables = Parameters<typeof authClient.passkey.deletePasskey>[0];

interface Args {
  onError?: (args: { error: Error; variables: Variables }) => void | Promise<void>;
  onSuccess?: (args: { variables: Variables }) => void | Promise<void>;
}

export const useDeletePasskeyMutation = (args: Args) => {
  const query = useQueryClient();

  const mutationFn = async (variables: Variables) => {
    const { data, error } = await authClient.passkey.deletePasskey(variables);

    if (error) {
      console.log(error);
      throw new BetterAuthError(error);
    }

    return data;
  };

  return useMutation({
    mutationFn,
    onError: async (error, variables, onMutateResult, context) => {
      console.error({ error, variables, onMutateResult, context });
      await args.onError?.({ error, variables });
    },
    onSuccess: async (_data, variables) => {
      query.invalidateQueries({ queryKey: [USE_USER_PASSKEYS_KEY] });
      await args.onSuccess?.({ variables });
    },
  });
};
