import { getCheckInsByStudyId } from '@controllers/studyController';
import express from 'express';

const studyRouter = express.Router();

studyRouter.get('/:id/checkin', getCheckInsByStudyId);

export default studyRouter;
