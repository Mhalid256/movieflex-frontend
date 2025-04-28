// src/utils/firebase-config.js
import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

// ✅ Step 1: Create config using environment variables (more secure for Vercel)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// ✅ Step 2: Initialize Firebase first
const app = initializeApp(firebaseConfig);

// ✅ Step 3: Now you can get functions after initialization
const functions = getFunctions(app);

// ✅ Step 4: Export everything you need
export const firebaseAuth = getAuth(app);
export const createCheckoutSession = httpsCallable(functions, "createCheckoutSession");
