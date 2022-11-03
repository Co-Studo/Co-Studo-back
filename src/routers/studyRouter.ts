import {
  getAnnouncementsByStudyId,
  patchAnnouncement,
  postAnnouncement,
} from '@controllers/study/announcementController';
import { postTag } from '@controllers/study/tagController';
import {
  getStudies,
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
 *          default: false
 *          schema:
 *            type: boolean
 *     responses:
 *       200:
 *         description: 스터디 목록 조회 성공
 */
studyRouter.get('/', getStudies);

// POST
studyRouter.post('/', postStudy);

// PATCH
studyRouter.patch('/:studyId', patchStudy);

// ----------- tag -------------- //
studyRouter.post('/tag', postTag);

// ----------- announcement -------------- //
studyRouter.get('/:studyId/announcement', getAnnouncementsByStudyId);
studyRouter.post('/:studyId/announcement', postAnnouncement);
studyRouter.patch('/:studyId/announcement/:announcementId', patchAnnouncement);

export default studyRouter;
