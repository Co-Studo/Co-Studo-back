import { sendMethodResult } from '@common/utils';
import { CreateTagInput } from '@dtos/create-tag.dto';
import { CreateStudyInput } from '@dtos/study.dto';
import * as studyService from '@services/studyService';
import * as userService from '@services/userService';

export const postTag = sendMethodResult(async (req) => {
  const { body: tagInput }: { body: CreateTagInput } = req;
  return studyService.createTag(tagInput);
});

export const patchStudy = sendMethodResult(async (req) => {
  const {
    body: { tagIds, ...updateStudyInput },
    params,
  } = req;
  const { studyId } = params;

  if (tagIds) {
    const tags = await Promise.all(
      tagIds.map((tagId: string) => studyService.getTagById(tagId))
    );
    updateStudyInput.tags = tags;
  }
  return studyService.updateStudy(studyId, updateStudyInput);
});

export const postStudy = sendMethodResult(async (req) => {
  const tempUser = await userService.getUserByEmail('test@test.com');
  const owner = tempUser;
  const {
    body: { tagIds, ...restInput },
  } = req;

  const tags = tagIds
    ? await Promise.all(
        tagIds.map((tagId: string) => studyService.getTagById(tagId))
      )
    : [];

  const studyInput: CreateStudyInput = {
    owner,
    tags,
    ...restInput,
  };
  return studyService.createStudy(studyInput);
});

export const getStudies = sendMethodResult(async (req) => {
  const { recruiting } = req.query;
  return studyService.getStudies(Boolean(recruiting));
});

export const getStudyAnnouncement = sendMethodResult(async (req) => {
  const { isFixed } = req.query;
  const { studyId } = req.params;
  return studyService.getStudyAnnouncement(studyId, Boolean(isFixed));
});
