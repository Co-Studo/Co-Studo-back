import { sendMethodResult } from '@common/utils';
import * as userService from '@services/userService';
import { authService, createIdTokenFromCustomToken } from 'src/firebaseApp';

export const getTempUserToken = sendMethodResult(async () => {
  const token = await createIdTokenFromCustomToken(
    'drArNNfiuFf4UhpLhDiBK0Q41c22'
  );
  return token;
});

export const getUsers = sendMethodResult(async () => authService.getUsers([]));

export const getUserByEmail = sendMethodResult(async (req) => {
  const { email } = req.params;
  return authService.getUserByEmail(email);
});

export const postUser = sendMethodResult(async (req) => {
  const {
    body: { uid },
  } = req;
  return userService.createUser(uid);
});
