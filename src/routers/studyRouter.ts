import {
  getAnnouncementsByStudyId,
  patchAnnouncement,
  postAnnouncement,
} from '@controllers/study/announcementController';
import { postTag } from '@controllers/study/tagController';
import {
  getStudies,
  getStudiesMine,
  patchStudy,
  postStudy,
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
studyRouter.get('/', getStudies);

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
studyRouter.get('/mine', getStudiesMine);

// POST
studyRouter.post('/', postStudy);

// PATCH
studyRouter.patch('/:studyId', patchStudy);

// ----------- tag -------------- //
studyRouter.post('/tag', postTag);

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
 *          default: wtWERTOmEgPTdh91BanU
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
studyRouter.get('/:studyId/announcement', getAnnouncementsByStudyId);
studyRouter.post('/:studyId/announcement', postAnnouncement);
studyRouter.patch('/:studyId/announcement/:announcementId', patchAnnouncement);

export default studyRouter;
