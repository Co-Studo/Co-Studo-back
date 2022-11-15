import { User } from '@entities/user.entity';
import { db } from 'src/firebaseApp';

const userRef = db.collection('user');

export const getUser = async (uid: string): Promise<User> => {
  const snapshot = await userRef.doc(uid).get();
  if (!snapshot.exists) {
    throw new Error('No matching documents.');
  }

  const user = {
    id: snapshot.id,
    ...snapshot.data(),
  } as User;

  return user;
};

export const createUser = async (uId: string) => {
  const newUser = await userRef.doc(uId).set({ studyId: [] });
  return newUser;
};
