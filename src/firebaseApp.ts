import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseApp = initializeApp();

export const authService = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export default firebaseApp;
