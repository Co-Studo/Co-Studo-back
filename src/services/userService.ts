import { authService } from 'src/firebaseApp';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await authService.getUserByEmail(email);
    return user;
  } catch (e) {
    return null;
  }
};

export const getUsers = async () => {
  const users = await (await authService.listUsers()).users;
  return users.map((user) => ({ email: user.email }));
};
