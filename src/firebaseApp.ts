import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseApp = initializeApp();

export const createIdTokenFromCustomToken = async (uid: string) => {
  const customToken = await getAuth().createCustomToken(uid);
  const res = await fetch(
    `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: customToken,
        returnSecureToken: true,
      }),
    }
  );
  const { idToken } = await res.json();
  return idToken;
};

export const authService = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);

export default firebaseApp;
