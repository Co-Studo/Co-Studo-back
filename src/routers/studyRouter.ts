import { sendMethodResult } from '@common/utils';
import {
  getAnnouncementsByStudyId,
  patchAnnouncement,
  postAnnouncement,
} from '@controllers/study/announcementController';
import { postTag } from '@controllers/study/tagController';
import {
  getStudies,
  getStudiesMine,
  getStudyById,
  patchStudy,
  createStudy,
} from '@controllers/studyController';
import express from 'express';

const studyRouter = express.Router();

// GET
/**
 * @openapi
 * /study:
 *   get:
 *     tags: [Study]
 *     description: 스터디 목록 조회
 *     parameters:
 *        - in: query
 *          name: recruiting
 *          description: 모집중인 스터디만 조회
 *          required: false
 *          schema:
 *            type: boolean
 *     responses:
 *       200:
 *         description: 스터디 목록 조회 성공
 */
studyRouter.get('/', sendMethodResult(getStudies));

/**
 * @openapi
 * /study/mine:
 *   get:
 *     tags: [Study]
 *     description: 나의 참여중인 스터디 목록 조회
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: 스터디 목록 조회 성공
 */
studyRouter.get('/mine', sendMethodResult(getStudiesMine));
/**
 * @openapi
 * /study/{studyId}:
 *   get:
 *     tags: [Study]
 *     description: 스터디 조회
 *     parameters:
 *        - in: path
 *          name: studyId
 *          description: 스터디 아이디
 *          required: true
 *          default: NcTdHUJPVQdBWy0rkI0G
 *          schema:
 *           type: string
 *     responses:
 *       200:
 *        description: 스터디 조회 성공
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Study'
 */
studyRouter.get('/:studyId', sendMethodResult(getStudyById));

// POST
/**
 * @openapi
 * /study:
 *   post:
 *     tags: [Study]
 *     description: 스터디 생성
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *          schema:
 *           type: object
 *           properties:
 *            title:
 *             type: string
 *            shortDescription:
 *             type: string
 *            description:
 *             type: string
 *            maxParticipants:
 *             type: number
 *            tagIds:
 *             type: array
 *             items:
 *              type: string
 *            isPublic:
 *             type: boolean
 *            endedAt:
 *             type: string
 *            isRequireCheckIn:
 *             type: boolean
 *            isRequireCheckOut:
 *             type: boolean
 *            isCheckOutIsArticle:
 *             type: boolean
 *           required:
 *            - title
 *            - shortDescription
 *            - description
 *            - isPublic
 *            - isRequireCheckIn
 *            - isRequireCheckOut
 *            - isCheckOutIsArticle
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *        description: 수정 완료
 */
studyRouter.post('/', sendMethodResult(createStudy));

// PATCH
studyRouter.patch('/:studyId', sendMethodResult(patchStudy));

// ----------- tag -------------- //
studyRouter.post('/tag', sendMethodResult(postTag));

// ----------- announcement -------------- //
/**
 * @openapi
 * /study/{studyId}/announcement:
 *   get:
 *     tags: [Study]
 *     description: 스터디 목록 조회
 *     parameters:
 *        - in: path
 *          name: studyId
 *          description: 스터디 아이디
 *          required: true
 *          default: NcTdHUJPVQdBWy0rkI0G
 *          schema:
 *           type: string
 *        - in: query
 *          name: isFixed
 *          description: 고정된 공지사항만 조회
 *          required: false
 *          schema:
 *            type: boolean
 *     responses:
 *       200:
 *         description: 스터디 공지사항 목록 조회 성공
 */
studyRouter.get(
  '/:studyId/announcement',
  sendMethodResult(getAnnouncementsByStudyId)
);
studyRouter.post('/:studyId/announcement', sendMethodResult(postAnnouncement));
studyRouter.patch(
  '/:studyId/announcement/:announcementId',
  sendMethodResult(patchAnnouncement)
);

export default studyRouter;
