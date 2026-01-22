// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZMHhFPfqnJx-IkWOpzD1gX3z9iL3Bvvo",
  authDomain: "planora-922af.firebaseapp.com",
  projectId: "planora-922af",
  storageBucket: "planora-922af.firebasestorage.app",
  messagingSenderId: "159749470827",
  appId: "1:159749470827:web:6a0d32a1e2cc7d59550f2e",
  measurementId: "G-LJM33W3SP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & DB
export const auth = getAuth(app);
export const db = getFirestore(app);