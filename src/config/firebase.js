import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// User's Live Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBMc2xfDnTW2ehRy3JZ-jPA1aBMjLq6H3U",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "food-pluse.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "food-pluse",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "food-pluse.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "197905263702",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:197905263702:web:dfad92765dce6e32ef9ff7",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-34GQHV5MDV"
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Firebase Analytics safely for browser environment
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.warn("Analytics initialization notice:", err);
  });
}

export const isFirebaseConfigured = true;

export default app;
