import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import { precacheAndRoute } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;

// Workbox precaching - required for vite-plugin-pwa
precacheAndRoute(self.__WB_MANIFEST ?? []);

// Handle offline navigation
const FALLBACK_URL = "/offline.html";

self.addEventListener("fetch", (event: FetchEvent) => {
  const { request } = event;

  // Only handle navigation requests
  if (request.mode !== "navigate") {
    return;
  }

  event.respondWith(
    fetch(request).catch(async () => {
      const fallback = await caches.match(FALLBACK_URL);
      return fallback || new Response("Offline");
    }),
  );
});

// Firebase initialization
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

let messaging: ReturnType<typeof getMessaging> | null = null;

try {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);

  // Handle background messages from FCM
  onBackgroundMessage(messaging, (payload) => {
    const notificationTitle = payload.notification?.title || "New Notification";
    const notificationOptions: NotificationOptions = {
      badge: "/icons/tsar-192x192.png",
      body: payload.notification?.body || "",
      icon: payload.notification?.icon || "/icons/tsar-192x192.png",
      requireInteraction: false,
      tag: "fcm-notification",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (error) {
  console.error("Failed to initialize Firebase in Service Worker:", error);
}

// Handle notification clicks
self.addEventListener("notificationclick", (event: NotificationEvent) => {
  event.notification.close();

  // Open the app or navigate to a specific page
  event.waitUntil(
    (async () => {
      const clientList = await self.clients.matchAll({
        includeUncontrolled: true,
        type: "window",
      });
      for (const client of clientList) {
        if (client.url === "/" && "focus" in client) {
          client.focus();
          return;
        }
      }
      if (self.clients.openWindow) {
        await self.clients.openWindow("/");
      }
    })(),
  );
});

// Skip waiting for new SW versions
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
