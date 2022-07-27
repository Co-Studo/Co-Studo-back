import userRouter from '@routers/userRouter';
import express from 'express';

const app = express();

app.use('/user', userRouter);

export default app;
