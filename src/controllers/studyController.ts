import { sendMethodResult } from '@common/utils';
import { CreateStudyInput } from '@dtos/create-study.dto';
import * as studyService from '@services/studyService';
import * as userService from '@services/userService';

export const postStudy = sendMethodResult(async (req) => {
  const tempUser = await userService.getUserByEmail('test@test.com');
  const owner = tempUser;
  const {
    body: { tagIds, startedAt, endedAt, ...restInput },
  } = req;

  const tags = await Promise.all(
    tagIds.map((tagId: string) => studyService.getTagById(tagId))
  );

  const studyInput: CreateStudyInput = {
    owner,
    tags,
    startedAt: startedAt || new Date(),
    endedAt: endedAt || null,
    ...restInput,
  };
  return studyService.createStudy(studyInput);
});

export const getRecruitingStudies = sendMethodResult(async () =>
  studyService.getRecruitingStudies()
);
