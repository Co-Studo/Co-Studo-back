import { authService } from 'src/firebaseApp';

export const getUserByEmail = async (email: string) => {
  const user = await authService.getUserByEmail(email);
  return user;
};

export const getMe = async () => {};

// export const getMe = () => {
//   const me = authService;
//   console.log(me);
//   return me;
// };
