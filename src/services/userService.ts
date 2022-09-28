import { authService } from 'src/firebaseApp';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await authService.getUserByEmail(email);
    return user;
  } catch (e) {
    return null;
  }
};

export const getMe = async (idToken: string) => {
  // get user by firebase auth token
  const decodedIdToken = await authService.verifyIdToken(idToken);
  console.log(decodedIdToken);
};

// export const getMe = () => {
//   const me = authService;
//   console.log(me);
//   return me;
// };
