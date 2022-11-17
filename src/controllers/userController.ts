import { UserOutput } from '@dtos/user/user.dto';
import * as userService from '@services/userService';
import { Request } from 'express';
import { authService, createIdTokenFromCustomToken } from 'src/firebaseApp';

export const getTempUserToken = async (): Promise<string> => {
  const token = await createIdTokenFromCustomToken(
    'drArNNfiuFf4UhpLhDiBK0Q41c22'
  );
  return token;
};

export const getUsers = async (): Promise<UserOutput[]> =>
  userService.getUsers();

export const getUser = async (req: Request): Promise<UserOutput> => {
  const { uid } = req.params;
  return userService.getUser(uid);
};

export const getUserByEmail = async (req: Request) => {
  const { email } = req.params;
  return authService.getUserByEmail(email);
};

export const postUser = async (req: Request) => {
  const {
    body: { uid },
  } = req;
  return userService.createUser(uid);
};
