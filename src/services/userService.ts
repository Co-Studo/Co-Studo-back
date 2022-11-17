import { UserOutput } from '@dtos/user/user.dto';
import { User } from '@entities/user.entity';
import { UserRecord } from 'firebase-admin/auth';
import { authService, db } from 'src/firebaseApp';

const userRef = db.collection('user');

// ---- GET ----
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

export const getUsers = async (): Promise<UserOutput[]> => {
  const listUsers = await authService.listUsers();
  const users: UserOutput[] = listUsers.users.map((user: UserRecord) => {
    const { uid, photoURL, displayName } = user;
    return {
      id: uid,
      displayName,
      photoURL,
    };
  });
  return users;
};

// ---- POST ----
export const createUser = async (uId: string) => {
  const newUser = await userRef.doc(uId).set({ studyIds: [] });
  return newUser;
};
