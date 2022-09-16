import { sendMethodResult } from '@common/utils';
import {
  createUser,
  getMe,
  getUser,
  getUsers,
  githubLogin,
} from '@controllers/userController';
import express from 'express';

const userRouter = express.Router();

userRouter.get('/githubLogin', sendMethodResult(githubLogin));
userRouter.get('/me', sendMethodResult(getMe));
userRouter.get('/:id', sendMethodResult(getUser));
userRouter.get('/', sendMethodResult(getUsers));
userRouter.post('/', sendMethodResult(createUser));

export default userRouter;
