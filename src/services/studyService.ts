import NoMatchingDocuments from '@common/exceptions/no-matching-documents';
import { CreateStudyInput, UpdateStudyInput } from '@dtos/study.dto';
import { Study } from '@entities/study.entity';
import { User } from '@entities/user.entity';
import * as tagService from '@services/study/tagService';
import * as userService from '@services/userService';
import { db } from 'src/firebaseApp';

const studyRef = db.collection('study');
const userRef = db.collection('user');

// ---- GET ----
export const getStudies = async (recruiting: boolean) => {
  const snapshot = await studyRef.get();
  if (snapshot.empty) {
    throw new NoMatchingDocuments('getStudies');
  }

  const datas = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data() as Study;
      const { tagIds, participantIds, ownerId, ...rest } = data;

      const tags = await Promise.all(
        tagIds.map((tagId) => tagService.getTagById(tagId))
      );
      const participants = await Promise.all(
        participantIds.map((participantId) =>
          userService.getUser(participantId)
        )
      );
      const owner = await userService.getUser(ownerId);

      return { id: doc.id, tags, participants, owner, ...rest };
    })
  );

  if (recruiting) {
    return datas.filter((data) => data.isRecruiting);
  }
  return datas;
};

export const getStudyById = async (studyId: string) => {
  const studyDoc = await studyRef.doc(studyId).get();
  if (!studyDoc.exists) {
    throw new NoMatchingDocuments('getStudyById');
  }
  const data = studyDoc.data() as Study;
  const { tagIds, participantIds, ownerId, ...rest } = data;

  const tags = await Promise.all(
    tagIds.map((tagId) => tagService.getTagById(tagId))
  );
  const participants = await Promise.all(
    participantIds.map((participantId) => userService.getUser(participantId))
  );
  const owner = await userService.getUser(ownerId);

  return { id: studyDoc.id, tags, participants, owner, ...rest };
};

// TODO: 테스트 필요
export const getStudiesMine = async (uid: string) => {
  const userEntity = await userRef.doc(uid).get();
  const { studyIds } = userEntity.data() as User;

  const studies = await Promise.all(
    studyIds.map((studyId) => getStudyById(studyId))
  );
  return studies;
};

// ---- POST ----
export const createStudy = async (
  studyInput: CreateStudyInput & { ownerId: string }
): Promise<void> => {
  const defaultStudyInput = {
    isPublic: true,
    isRecruiting: true,
    startedAt: new Date(),
    tagIds: [],
    participantIds: [],
  };

  const { tagIds, ...restInput } = studyInput;

  const newStudyInput = {
    ...defaultStudyInput,
    tagIds: tagIds || defaultStudyInput.tagIds,
    ...restInput,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await studyRef.add(newStudyInput);
};

// ---- PATCH ----
// TODO: 수정필요
export const updateStudy = async (
  studyId: string,
  studyInput: UpdateStudyInput
) => {
  const study = await studyRef.doc(studyId).update(studyInput);
  return study;
};
