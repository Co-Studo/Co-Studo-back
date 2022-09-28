import {
  signInWithGithub,
  createUser,
  getUsers,
} from '@controllers/userController';
import express from 'express';

const userRouter = express.Router();

userRouter.post('/create', createUser);
userRouter.get('/', getUsers);
userRouter.get('/githubLogin', signInWithGithub);

export default userRouter;
