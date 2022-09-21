import { User } from '@common/entities/User';
import { sendMethodResult } from '@common/utils';
import * as userService from '@services/userService';

export const getMe = sendMethodResult<Partial<User>>(() => ({
  email: 'asd',
  nickname: 'asd',
  avatartUrl: 'asd',
}));

export const getUsers = async () => userService.findAll();

export const signInWithGithub = async () => userService.githubSignIn();
