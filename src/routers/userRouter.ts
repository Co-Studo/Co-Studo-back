import {
  getTempUserToken,
  getUsers,
  postUser,
} from '@controllers/userController';
import express from 'express';

const userRouter = express.Router();

// DEVELOPMENT

if (process.env.NODE_ENV === 'development') {
  /**
   * @openapi
   * /user/temp:
   *   get:
   *     tags: [Test]
   *     description: 토큰 발급용 유저 조회
   *     responses:
   *       200:
   *         description: 임시 유저 조회 성공
   */
  userRouter.get('/temp', getTempUserToken);
}

// GET
userRouter.get('/', getUsers);

// POST
userRouter.post('/', postUser);

export default userRouter;
