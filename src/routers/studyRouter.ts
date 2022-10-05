import { getRecruitingStudies, postStudy } from '@controllers/studyController';
import express from 'express';

const studyRouter = express.Router();

// GET
studyRouter.get('/recruit', getRecruitingStudies);

// POST
studyRouter.post('/', postStudy);

export default studyRouter;
