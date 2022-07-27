import { createUser, getUser, getUsers } from '@controllers/userController';
import express from 'express';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);

export default userRouter;
