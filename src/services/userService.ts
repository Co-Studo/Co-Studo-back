import { CreateUserInput } from '@dtos/create-user.dto';
import { db } from 'src/firebaseApp';

const usersRef = db.collection('users');

export const getUserByEmail = async (email: string) => {
  const snapshot = await usersRef.where('email', '==', email).get();
  if (snapshot.empty) {
    throw Error('No matching documents in getUserByEmail.');
  }
  return snapshot.docs.map((doc) => doc.data());
};

export const getUsers = async () => {
  const snapshot = await usersRef.get();
  if (snapshot.empty) {
    throw Error('No matching documents in getUsers.');
  }
  return snapshot.docs.map((doc) => doc.data());
};

export const createUser = async (userInput: CreateUserInput) => {
  const { uid, ...restInput } = userInput;
  const defaultUserInput = {
    studies: [],
  };
  const createUserData = {
    ...defaultUserInput,
    ...restInput,
  };
  const user = await usersRef.doc(uid).set(createUserData);
  return user;
};
