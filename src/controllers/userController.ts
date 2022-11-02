import { sendMethodResult } from '@common/utils';
import * as userService from '@services/userService';

export const getUsers = sendMethodResult(async () => userService.getUsers());

export const getUserByEmail = sendMethodResult(async (req) => {
  const { email } = req.params;
  return userService.getUserByEmail(email);
});

export const postUser = sendMethodResult(async (req) => {
  const { body } = req;
  return userService.createUser(body);
});
