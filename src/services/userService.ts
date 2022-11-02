import NoMatchingDocuments from '@common/exceptions/no-matching-documents';
import { CreateUserInput } from '@dtos/create-user.dto';
import { db } from 'src/firebaseApp';

const usersRef = db.collection('users');

export const getUserByEmail = async (email: string) => {
  const snapshot = await usersRef.where('email', '==', email).get();
  if (snapshot.empty) {
    throw new NoMatchingDocuments('getUserByEmail');
  }
  return snapshot.docs.map((doc) => doc.data());
};

export const getUsers = async () => {
  const snapshot = await usersRef.get();
  if (snapshot.empty) {
    throw new NoMatchingDocuments('getUsers');
  }
  return snapshot.docs.map((doc) => doc.data());
};

export const createUser = async (userInput: CreateUserInput) => {
  const { uid, ...restInput } = userInput;

  const createUserData = {
    ...restInput,
  };
  const user = await usersRef.doc(uid).set(createUserData);
  return user;
};
