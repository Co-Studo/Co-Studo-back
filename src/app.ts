import cors from '@middlewares/cors';
import studyRouter from '@routers/studyRouter';
import userRouter from '@routers/userRouter';
import express from 'express';

const app = express();

app.use(cors);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/user', userRouter);
app.use('/study', studyRouter);

export default app;
