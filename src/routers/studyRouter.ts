import { postTag } from '@controllers/study/tagController';
import {
  getStudies,
  getStudyAnnouncement,
  patchStudy,
  postStudy,
} from '@controllers/studyController';
import express from 'express';

const studyRouter = express.Router();

// GET
studyRouter.get('/', getStudies);
studyRouter.get('/:studyId/announcement', getStudyAnnouncement);

// POST
studyRouter.post('/', postStudy);

// PATCH
studyRouter.patch('/:studyId', patchStudy);

// ----------- tag -------------- //
studyRouter.post('/tag', postTag);

// ----------- announcement -------------- //

export default studyRouter;
