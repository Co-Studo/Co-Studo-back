import NoMatchingDocuments from '@common/exceptions/no-matching-documents';
import { CreateStudyInput, UpdateStudyInput } from '@dtos/study.dto';
import { db } from 'src/firebaseApp';

const studyRef = db.collection('study');

export const updateStudy = async (
  studyId: string,
  studyInput: UpdateStudyInput
) => {
  const study = await studyRef.doc(studyId).update(studyInput);
  return study;
};

export const createStudy = async (studyInput: CreateStudyInput) => {
  const defaultStudyInput = {
    isPublic: true,
    isRecruiting: true,
    startedAt: new Date(),
    tags: [],
    participants: [],
    announcements: [],
  };
  const study = await studyRef.add({
    ...defaultStudyInput,
    ...studyInput,
  });
  return study;
};

export const getStudies = async (recruiting: boolean) => {
  const snapshot = await studyRef.get();
  if (snapshot.empty) {
    throw new NoMatchingDocuments('getStudies');
  }
  if (recruiting) {
    return snapshot.docs.filter((doc) => doc.data().isRecruiting);
  }
  return snapshot.docs.map((doc) => doc.data());
};

export const getStudyAnnouncement = async (
  studyId: string,
  isFixed: boolean
) => {
  const snapshot = await studyRef
    .doc(studyId)
    .collection('announcement')
    .where('isFixed', '==', isFixed)
    .get();
  if (snapshot.empty) {
    throw new NoMatchingDocuments('getStudyAnnouncement');
  }
  return snapshot.docs.map((doc) => doc.data());
};
