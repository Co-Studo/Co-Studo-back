import {
  signInWithGithub,
  createUser,
  getUsers,
  login,
} from '@controllers/userController';
import express from 'express';

const userRouter = express.Router();

userRouter.post('/create', createUser);
userRouter.post('/login', login);
userRouter.get('/', getUsers);
userRouter.get('/githubLogin', signInWithGithub);

export default userRouter;
