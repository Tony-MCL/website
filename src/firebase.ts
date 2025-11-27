import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucketEnv = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env
  .VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

// Storage-bucket kan vi tåle litt slakk på – bruker standard hvis ikke satt
const storageBucket =
  storageBucketEnv || (projectId ? `${projectId}.appspot.com` : undefined);

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
