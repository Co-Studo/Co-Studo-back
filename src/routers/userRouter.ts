import { getUsers } from '@controllers/userController';
import express from 'express';

const userRouter = express.Router();

userRouter.get('/', getUsers);

export default userRouter;
