import { getMe, getUsers } from '@controllers/userController';
import express from 'express';

const userRouter = express.Router();

userRouter.get('/me', getMe);
userRouter.get('/', getUsers);

export default userRouter;
