import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// User's Live Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMc2xfDnTW2ehRy3JZ-jPA1aBMjLq6H3U",
  authDomain: "food-pluse.firebaseapp.com",
  projectId: "food-pluse",
  storageBucket: "food-pluse.firebasestorage.app",
  messagingSenderId: "197905263702",
  appId: "1:197905263702:web:dfad92765dce6e32ef9ff7",
  measurementId: "G-34GQHV5MDV"
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
