import { CoreEntity } from '@entities/core.entity';
import { Study } from '@entities/study.entity';

/**
 * @openapi
 *  components:
 *   schemas:
 *    Tag:
 *     type: object
 *     properties:
 *      name:
 *       type: string
 *       description: 태그명
 *      studyIds:
 *       type: array
 *       items:
 *        type: string
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
export type Tag = {
  name: string;
  studyIds: string[];
} & CoreEntity;
