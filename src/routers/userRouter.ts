import { signInWithGithub, getMe } from '@controllers/userController';
import express from 'express';

const userRouter = express.Router();

userRouter.get('/me', getMe);
userRouter.get('/githubLogin', signInWithGithub);

export default userRouter;
