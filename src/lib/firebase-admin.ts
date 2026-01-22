import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Note: In production, use a service account JSON or environment variables
// For this demo template, we check if we can initialize.

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : null;

let adminApp;

if (serviceAccount && !getApps().length) {
  adminApp = initializeApp({
    credential: cert(serviceAccount)
  });
} else if (!getApps().length && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  // Attempt default google cloud init if strictly on GCP
  // adminApp = initializeApp();
}

export const adminDb = adminApp ? getFirestore(adminApp) : null;
