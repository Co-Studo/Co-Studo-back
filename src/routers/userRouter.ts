import { getUsers, postUser } from '@controllers/userController';
import express from 'express';

const userRouter = express.Router();

// GET
userRouter.get('/', getUsers);

// POST
userRouter.post('/', postUser);

export default userRouter;
