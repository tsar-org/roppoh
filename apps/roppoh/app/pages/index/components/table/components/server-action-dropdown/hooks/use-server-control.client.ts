import { useQueryClient } from "@tanstack/react-query";
import type { ErrorT } from "dokploy-sdk/models";
import { useState } from "react";
import { toast } from "sonner";
import { DokployError, isDokployError } from "@/libs/dokploy-sdk/error";

export const useServerControl = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const queryClient = useQueryClient();

  const execute = (options: {
    apiCall: () => Promise<ErrorT | undefined>;
    loading: string;
    success: string;
    error: string;
  }) => {
    setIsProcessing(true);

    const wrappedPromise = options.apiCall().then((res) => {
      if (isDokployError(res)) throw new DokployError(res);
      return res;
    });

    toast.promise(wrappedPromise, {
      error: () => {
        setIsProcessing(false);
        queryClient.refetchQueries();
        return options.error;
      },
      loading: options.loading,
      success: () => {
        setIsProcessing(false);
        queryClient.refetchQueries();
        return options.success;
      },
    });
  };

  return { execute, isProcessing };
};
