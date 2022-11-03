import NoMatchingDocuments from '@common/exceptions/no-matching-documents';
import { CreateStudyInput, UpdateStudyInput } from '@dtos/study.dto';
import { Study } from '@entities/study.entity';
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
  };

  const newStudyInput: Study = {
    ...defaultStudyInput,
    ...studyInput,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const study = await studyRef.add(newStudyInput);
  return study;
};

export const getStudies = async (recruiting: boolean) => {
  const snapshot = await studyRef.get();
  if (snapshot.empty) {
    throw new NoMatchingDocuments('getStudies');
  }
  const datas: FirebaseFirestore.DocumentData[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (recruiting) {
    return datas.filter((data) => data.isRecruiting);
  }
  return datas;
};
