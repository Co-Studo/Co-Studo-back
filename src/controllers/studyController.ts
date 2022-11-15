import IdTokenExpired from '@common/exceptions/id-token-expired';
import { sendMethodResult } from '@common/utils';
import { CreateStudyInput } from '@dtos/study.dto';
import * as tagService from '@services/study/tagService';
import * as studyService from '@services/studyService';
import { FirebaseError } from 'firebase-admin';
import { authService } from 'src/firebaseApp';

export const patchStudy = sendMethodResult(async (req) => {
  const {
    body: { tagIds, ...updateStudyInput },
    params,
  } = req;
  const { studyId } = params;

  if (tagIds) {
    const tags = await Promise.all(
      tagIds.map((tagId: string) => tagService.getTagById(tagId))
    );
    updateStudyInput.tags = tags;
  }
  return studyService.updateStudy(studyId, updateStudyInput);
});

export const postStudy = sendMethodResult(async (req) => {
  const tempUser = await authService.getUserByEmail('test@test.com');
  const owner = tempUser;
  const {
    body: { tagIds, ...restInput },
  } = req;

  const tags = tagIds
    ? await Promise.all(
        tagIds.map((tagId: string) => tagService.getTagById(tagId))
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

export const getStudiesMine = sendMethodResult(async (req) => {
  try {
    const { authorization } = req.headers;
    const accessToken = authorization?.split(' ')[1];

    if (!accessToken) {
      throw new Error('accessToken is required');
    }

    const { uid } = await authService.verifyIdToken(accessToken);
    return await studyService.getStudiesMine(uid);
  } catch (e) {
    const error = e as FirebaseError;
    if (error.code === 'auth/id-token-expired') {
      throw new IdTokenExpired();
    } else {
      throw new Error(error.message);
    }
  }
});
