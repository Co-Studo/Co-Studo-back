import cors from '@middlewares/cors';
import userRouter from '@routers/userRouter';
import express from 'express';

const app = express();

app.use(cors);
app.use('/api/user', userRouter);

export default app;
