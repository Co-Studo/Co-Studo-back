import { CoreEntity } from '@entities/core.entity';

/**
 * @openapi
 *  components:
 *   schemas:
 *    Study:
 *     type: object
 *     properties:
 *      title:
 *       type: string
 *       description: 스터디 제목
 *      shortDescription:
 *       type: string
 *       description: 스터디 짧은 설명
 *      description:
 *       type: string
 *       description: 스터디 설명
 *      owner:
 *       type: object
 *       properties:
 *        id:
 *         type: string
 *        photoURL:
 *         type: string
 *       description: 스터디장
 *      participants:
 *       type: array
 *       items:
 *        type: object
 *        properties:
 *         id:
 *          type: string
 *         photoURL:
 *          type: string
 *        description: 스터디원
 *      maxParticipants:
 *       type: number
 *       description: 최대 참여자 수
 *      isRecruiting:
 *       type: boolean
 *       description: 모집 진행 여부
 *      isPublic:
 *       type: boolean
 *       description: 공개 여부
 *      startedAt:
 *       type: object
 *       properties:
 *         _seconds:
 *           type: number
 *         _nanoseconds:
 *           type: number
 *      endedAt:
 *       type: object
 *       properties:
 *         _seconds:
 *           type: number
 *         _nanoseconds:
 *           type: number
 *      tags:
 *       type: array
 *       items:
 *        type: object
 *        properties:
 *         name:
 *          type: string
 *      isRequireCheckIn:
 *       type: boolean
 *       description: 체크인 필수 여부
 *      isRequireCheckOut:
 *       type: boolean
 *       description: 체크아웃 필수 여부
 *      isCheckOutIsArticle:
 *       type: boolean
 *       description: 체크아웃시 글 작성 필요 여부
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
export type Study = {
  title: string;
  shortDescription: string;
  description: string;
  ownerId: string;
  participantIds: string[];
  maxParticipants?: number;
  tagIds: string[];
  isRecruiting: boolean;
  isPublic: boolean;
  startedAt: Date;
  endedAt?: Date;
  isRequireCheckIn: boolean;
  isRequireCheckOut: boolean;
  isCheckOutIsArticle: boolean;
} & CoreEntity;
