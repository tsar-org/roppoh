import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "sonner";

const SW_TOAST_ID = "sw-update-prompt-toast" as const;

const onNeedRefresh = (updateServiceWorker: () => Promise<void>) => {
  const onClick = () =>
    toast.promise(() => updateServiceWorker(), {
      error: "Failed update",
      loading: "Updating...",
      success: () => "Update complete.",
    });

  toast("Now available new version", {
    action: {
      label: "update",
      onClick: onClick,
    },
    description: "To use the latest service, an update is required.",
    id: SW_TOAST_ID,
  });
};

/**
 * Hook to manage PWA service worker update prompts
 *
 * Automatically shows a toast notification when a new service worker version
 * is available. Users can trigger the update directly from the toast action button.
 */
export function useSwUpdatePrompt() {
  const { updateServiceWorker } = useRegisterSW({
    immediate: true,
    onNeedRefresh() {
      onNeedRefresh(updateServiceWorker);
    },
    onRegisterError(error) {
      console.error("Failed SW Registration", error);
      toast.error("Failed SW Registration", { description: error });
    },
    onRegisteredSW() {},
  });

  return {};
}
