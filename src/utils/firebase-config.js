// src/utils/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBZlubkLtliImtFsFu-oYHC1TND7SYNu1s",
  authDomain: "netflix-clone-acb36.firebaseapp.com",
  projectId: "netflix-clone-acb36",
  storageBucket: "netflix-clone-acb36.firebasestorage.app",
  messagingSenderId: "295727015781",
  appId: "1:295727015781:web:e3c13cdf5984fb9e22638c"
};


const functions = getFunctions(getApp());

export const createCheckoutSession = httpsCallable(functions, "createCheckoutSession");


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
