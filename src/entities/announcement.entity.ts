import { CoreEntity } from '@entities/core.entity';
import { User } from '@entities/user.entity';

/**
 * @swagger
 *  components:
 *   schemas:
 *    Announcement:
 *     type: object
 *     properties:
 *      order:
 *       type: string
 *       description: 글 등록 순서
 *      writer:
 *       type: string
 *      title:
 *       type: string
 *      content:
 *       type: string
 *      isFixed:
 *       type: boolean
 *      createdAt:
 *       type: object
 *       properties:
 *        _seconds:
 *         type: number
 *        _nanoseconds:
 *         type: number
 *      updatedAt:
 *       type: object
 *       properties:
 *        _seconds:
 *         type: number
 *        _nanoseconds:
 *         type: number
 */

export type Announcement = {
  order: number;
  writer: Pick<User, 'name'>;
  title: string;
  content: string;
  isFixed: boolean;
} & CoreEntity;
