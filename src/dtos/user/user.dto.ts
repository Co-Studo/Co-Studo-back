import { UserRecord } from 'firebase-admin/auth';

/**
 * @openapi
 *  components:
 *   schemas:
 *    User:
 *     type: object
 *     properties:
 *      id:
 *       type: string
 *      photoURL:
 *       type: string
 *      displayName:
 *       type: string
 */
export type UserOutput = {
  id: string;
  photoURL?: string;
  displayName?: string;
};
