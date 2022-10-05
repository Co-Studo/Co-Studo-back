import { db } from 'src/firebaseApp';

const usersRef = db.collection('users');

export const getUserByEmail = async (email: string) => {
  const snapshot = await usersRef.where('email', '==', email).get();
  if (snapshot.empty) {
    throw Error('No matching documents.');
  }
  return snapshot.docs.map((doc) => doc.data());
};

export const getUsers = async () => {
  const snapshot = await usersRef.get();
  if (snapshot.empty) {
    throw Error('No matching documents.');
  }
  return snapshot.docs.map((doc) => doc.data());
};
