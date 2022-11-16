import { CoreEntity } from '@entities/core.entity';
import { UserRecord } from 'firebase-admin/auth';

export type User = {
  studyIds: string[];
} & CoreEntity;

/**
 * @swagger
 *  components:
 *   schemas:
 *    User:
 *     type: object
 *     properties:
 *      uid:
 *       type: string
 *      photoURL:
 *       type: string
 */
export type AuthUser = Pick<UserRecord, 'uid' | 'photoURL'>;
