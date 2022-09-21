import cors from '@middlewares/cors';
import studyRouter from '@routers/studyRouter';
import userRouter from '@routers/userRouter';
import express from 'express';

const app = express();

app.use(cors);
app.use('/api/user', userRouter);
app.use('/api/study', studyRouter);

export default app;
