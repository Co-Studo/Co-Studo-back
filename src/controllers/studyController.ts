import { useAuth } from '@common/utils';
import { CreateStudyInput } from '@dtos/study.dto';
import * as tagService from '@services/study/tagService';
import * as studyService from '@services/studyService';
import { Request } from 'express';
import { UserRecord } from 'firebase-admin/auth';
import { authService } from 'src/firebaseApp';

// ---- GET ----
export const getStudies = async (req: Request) => {
  const { recruiting } = req.query;
  return studyService.getStudies(Boolean(recruiting));
};

export const getStudiesMine = useAuth(async (req) => {
  const { uid } = req.user;
  return studyService.getStudiesMine(uid);
});

export const getStudyById = async (req: Request) => {
  const { studyId } = req.params;
  const study = await studyService.getStudyById(studyId);
  return study;
};

// ---- POST ----
export const createStudy = useAuth(async (req) => {
  const {
    body: createStudyInput,
    user: { uid },
  }: { body: CreateStudyInput; user: UserRecord } = req;

  const studyInput = {
    ownerId: uid,
    ...createStudyInput,
  };
  return studyService.createStudy(studyInput);
});

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
