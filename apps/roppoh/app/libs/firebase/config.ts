import { initializeApp } from "firebase/app";
import type { Messaging } from "firebase/messaging";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

let messagingInstance: Messaging | null = null;

/**
 * Get Firebase Messaging instance (singleton)
 * Initializes Firebase Cloud Messaging for push notifications
 */
export function getFirebaseMessaging(): Messaging {
  if (!messagingInstance) {
    messagingInstance = getMessaging(firebaseApp);
  }
  return messagingInstance;
}

/**
 * Check if Firebase configuration is valid
 */
export function isFirebaseConfigured(): boolean {
  return (
    !!firebaseConfig.apiKey &&
    !!firebaseConfig.projectId &&
    !!firebaseConfig.messagingSenderId &&
    !!firebaseConfig.appId
  );
}
