import { onMessage } from "firebase/messaging";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getFirebaseMessaging,
  isFirebaseConfigured,
} from "@/libs/firebase/config";
import { SONNER_ID_SET } from "@/libs/sonner/id";

/**
 * Hook to manage browser notification permissions and Firebase Cloud Messaging.
 *
 * This hook:
 * - Automatically requests notification permission from the user if not already granted
 * - Initializes Firebase Cloud Messaging if configured
 * - Retrieves and displays the FCM token for manual notification sending
 * - Sets up handlers for foreground messages
 *
 */
export const useNotificationPermission = () => {
  const [token, _setToken] = useState<string | null>(null);
  const [isInitializing, _setIsInitializing] = useState(false);

  const requestPermission = useCallback(async () => {
    const result = await Notification.requestPermission();
    if (result !== "granted") throw new Error();

    // // Initialize Firebase Cloud Messaging if configured
    // if (isFirebaseConfigured()) {
    //   try {
    //     setIsInitializing(true);
    //     const messaging = getFirebaseMessaging();
    //     const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;

    //     if (!vapidKey) {
    //       console.warn(
    //         "VITE_FIREBASE_VAPID_KEY is not configured. FCM notifications may not work.",
    //       );
    //       return;
    //     }

    //     const fcmToken = await getToken(messaging, { vapidKey });
    //     setToken(fcmToken);

    //     // Show token in a dismissible toast for manual Firebase Console sending
    //     toast.success("Notifications enabled! Copy token from console", {
    //       action: {
    //         label: "Copy",
    //         onClick: () => {
    //           navigator.clipboard.writeText(fcmToken);
    //           toast.success("Token copied to clipboard!");
    //         },
    //       },
    //       description: `Token (also in console): ${fcmToken.substring(0, 30)}...`,
    //       duration: 10000,
    //     });
    //   } catch (error) {
    //     console.error("Failed to initialize FCM:", error);
    //     toast.error("Failed to set up push notifications", {
    //       description: "Check the console for more details.",
    //     });
    //   } finally {
    //     setIsInitializing(false);
    //   }
    // }
  }, []);

  // Handle foreground messages from FCM
  useEffect(() => {
    if (
      !isFirebaseConfigured() ||
      Notification.permission !== "granted" ||
      isInitializing
    ) {
      return undefined;
    }

    try {
      const messaging = getFirebaseMessaging();
      const unsubscribe = onMessage(messaging, (payload) => {
        const notificationTitle =
          payload.notification?.title || "New Notification";
        const notificationOptions: NotificationOptions = {
          badge: "/icons/tsar-192x192.png",
          body: payload.notification?.body || "",
          icon: payload.notification?.icon || "/icons/tsar-192x192.png",
          tag: "fcm-notification",
        };

        // Show notification in foreground
        new Notification(notificationTitle, notificationOptions);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Failed to set up foreground message handler:", error);
      return undefined;
    }
  }, [isInitializing]);

  const promptNotificationPermission = useCallback(() => {
    const onclick = () =>
      toast.promise(() => requestPermission(), {
        error: "Failed to enable notifications 😔",
        loading: "Enabling notifications... ⏳",
        success: () => "You're all set! 🎉",
      });

    toast("Stay in the loop with Roppoh 🚀", {
      action: {
        label: "Enable",
        onClick: onclick,
      },
      description: "Get notified when servers start and stop ⚡",
      id: SONNER_ID_SET.REQUEST_NOTIFICATION_PERMISSION,
    });
  }, [requestPermission]);

  useEffect(() => {
    if (Notification.permission === "granted") return;

    promptNotificationPermission();
  }, [promptNotificationPermission]);

  return {
    fcmToken: token,
    isInitializing,
    permission: Notification.permission,
  };
};
