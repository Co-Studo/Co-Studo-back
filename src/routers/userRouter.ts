import { sendMethodResult } from '@common/utils';
import {
  getTempUserToken,
  getUser,
  getUsers,
  createUser,
  updateUser,
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
  userRouter.get('/temp', sendMethodResult(getTempUserToken));
}

// GET
/**
 * @openapi
 * /user:
 *   get:
 *     tags: [User]
 *     description: 유저 목록 조회
 *     responses:
 *       200:
 *         description: 유저 목록 조회 성공
 */
userRouter.get('/', sendMethodResult(getUsers));

/**
 * @openapi
 * /user/{uid}:
 *   get:
 *     tags: [User]
 *     description: 유저 조회
 *     parameters:
 *      - in: path
 *        name: uid
 *        schema:
 *         type: string
 *        required: true
 *        description: 유저 uid
 *        default: SmQUEUXFPISVDFfmLe8j8PON3UD3
 *     responses:
 *       200:
 *         description: 유저 조회 성공
 */
userRouter.get('/:uid', sendMethodResult(getUser));

// POST
userRouter.post('/', sendMethodResult(createUser));

// PATCH
/**
 * @openapi
 * /user/{uid}:
 *   patch:
 *     tags: [User]
 *     description: User 정보 수정 (displayName, photoURL)
 *     parameters:
 *       - in: path
 *         name: uid
 *         description: User ID
 *         required: true
 *         schema:
 *          type: string
 *     requestBody:
 *       content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *            displayName:
 *             type: string
 *            photoURL:
 *             type: string
 *     responses:
 *       200:
 *        description: 수정 완료
 */
userRouter.patch('/:uid', sendMethodResult(updateUser));

export default userRouter;
