import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authClient } from "@/client/libs/better-auth";

import { BetterAuthError } from "../error";
import { USE_USER_PASSKEYS_KEY } from "./use-user-passkeys";

type Variables = Parameters<typeof authClient.passkey.addPasskey>[0];

interface Args {
  onError?: (args: { error: Error; variables: Variables }) => void | Promise<void>;
  onSuccess?: (args: { variables: Variables }) => void | Promise<void>;
}

export const useAddPasskeyMutation = (args: Args) => {
  const query = useQueryClient();

  const mutationFn = async (variables: Variables) => {
    const res = await authClient.passkey.addPasskey(variables);

    if (res?.error) {
      console.log(res.error);
      throw new BetterAuthError(res.error);
    }

    return res;
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
