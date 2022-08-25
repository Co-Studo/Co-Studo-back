import {
  createUser,
  getMe,
  getUser,
  getUsers,
  githubLogin,
} from '@controllers/userController';
import express from 'express';

const userRouter = express.Router();

userRouter.get('/githubLogin', githubLogin);
userRouter.get('/me', getMe);
userRouter.get('/:id', getUser);
userRouter.get('/', getUsers);
userRouter.post('/', createUser);

export default userRouter;
