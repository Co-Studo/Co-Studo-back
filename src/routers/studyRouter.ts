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
