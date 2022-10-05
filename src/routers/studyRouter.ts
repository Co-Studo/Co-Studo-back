import {
  getRecruitingStudies,
  patchStudy,
  postStudy,
  postTag,
} from '@controllers/studyController';
import express from 'express';

const studyRouter = express.Router();

// GET
studyRouter.get('/recruit', getRecruitingStudies);

// POST
studyRouter.post('/', postStudy);
studyRouter.post('/tag', postTag);

// PATCH
studyRouter.patch('/:studyId', patchStudy);

export default studyRouter;
