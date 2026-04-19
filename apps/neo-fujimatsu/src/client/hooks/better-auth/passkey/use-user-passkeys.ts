import { useQuery } from "@tanstack/react-query";

import { authClient } from "@/client/libs/better-auth";

import { BetterAuthError } from "../error";

export const USE_USER_PASSKEYS_KEY = "better-auth-use-user-passkeys" as const;

export const useUserPasskeys = () => {
  const queryFn = async () => {
    const { data, error } = await authClient.passkey.listUserPasskeys();

    if (error) {
      console.log(error);
      throw new BetterAuthError(error);
    }

    return data;
  };

  return useQuery<Awaited<ReturnType<typeof queryFn>>, BetterAuthError>({
    queryKey: [USE_USER_PASSKEYS_KEY],
    queryFn,
  });
};
