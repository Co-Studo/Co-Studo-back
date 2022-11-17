import HttpException from '@common/exceptions/http';
import { useAuth } from '@common/utils';
import { UserOutput } from '@dtos/user/user.dto';
import * as userService from '@services/userService';
import { Request } from 'express';
import { authService, createIdTokenFromCustomToken } from 'src/firebaseApp';

// ---- GET ----
export const getTempUserToken = async (): Promise<string> => {
  const token = await createIdTokenFromCustomToken(
    'SmQUEUXFPISVDFfmLe8j8PON3UD3'
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

// --- POST ----
export const createUser = async (req: Request) => {
  const {
    body: { uid },
  } = req;
  return userService.createUser(uid);
};

// ---- PATCH ----
export const updateUser = useAuth(async (req) => {
  const {
    body: updateUserInput,
    user: { uid },
    params: { uid: uidParam },
  } = req;
  if (uid !== uidParam) {
    throw new HttpException(401, '올바른 접근이 아닙니다.');
  }
  return userService.updateUser(uid, updateUserInput);
});
