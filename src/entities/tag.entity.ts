import { CoreEntity } from '@entities/core.entity';
import { Study } from '@entities/study.entity';

/**
 * @swagger
 *  components:
 *   schemas:
 *    Tag:
 *     type: object
 *     properties:
 *      name:
 *       type: string
 *       description: 태그명
 *      studies:
 *       type: array
 *       items:
 *        $ref: '#/components/schemas/Study'
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
  studies: Study[];
} & CoreEntity;
