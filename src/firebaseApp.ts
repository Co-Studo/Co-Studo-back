import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseApp = initializeApp({
  credential: applicationDefault(),
});

export const authService = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// determine database URL

export default firebaseApp;
