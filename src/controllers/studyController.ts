import IdTokenExpired from '@common/exceptions/id-token-expired';
import { CreateStudyInput } from '@dtos/study.dto';
import * as tagService from '@services/study/tagService';
import * as studyService from '@services/studyService';
import { Request } from 'express';
import { FirebaseError } from 'firebase-admin';
import { authService } from 'src/firebaseApp';

// ---- GET ----
export const getStudies = async (req: Request) => {
  const { recruiting } = req.query;
  return studyService.getStudies(Boolean(recruiting));
};

export const getStudiesMine = async (req: Request) => {
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
};

export const getStudyById = async (req: Request) => {
  const { studyId } = req.params;
  const study = await studyService.getStudyById(studyId);
  return study;
};

// ---- POST ----
export const createStudy = async (req: Request) => {
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
};

// ---- PATCH ----
export const patchStudy = async (req: Request) => {
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
};
