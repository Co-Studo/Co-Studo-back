import {
  createUser,
  getUser,
  getUsers,
  githubLogin,
} from '@controllers/userController';
import express from 'express';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.get('/githubLogin', githubLogin);

export default userRouter;
