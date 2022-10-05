import {
  getRecruitingStudies,
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

export default studyRouter;
