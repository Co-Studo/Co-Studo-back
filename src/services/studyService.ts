import NoMatchingDocuments from '@common/exceptions/no-matching-documents';
import { CreateStudyInput, UpdateStudyInput } from '@dtos/study.dto';
import { User } from '@entities/user.entity';
import { db } from 'src/firebaseApp';

const studyRef = db.collection('study');
const userRef = db.collection('user');

// ---- GET ----
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

export const getStudiesMine = async (uid: string) => {
  const userEntity = await userRef.doc(uid).get();
  const { studyIds } = userEntity.data() as User;

  const snapshots = await Promise.all(
    studyIds.map((studyId) => studyRef.doc(studyId).get())
  );
  return snapshots.map((snapshot) => ({
    id: snapshot.id,
    ...snapshot.data(),
  }));
};

export const getStudyById = async (studyId: string) => {
  const studyDoc = await studyRef.doc(studyId).get();
  if (!studyDoc.exists) {
    throw new NoMatchingDocuments('getStudyById');
  }
  return studyDoc.data();
};

// ---- POST ----
export const createStudy = async (
  studyInput: CreateStudyInput
): Promise<void> => {
  const defaultStudyInput = {
    isPublic: true,
    isRecruiting: true,
    startedAt: new Date(),
    tags: [],
  };

  const newStudyInput: CreateStudyInput = {
    ...defaultStudyInput,
    ...studyInput,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await studyRef.add(newStudyInput);
};

// ---- PATCH ----
export const updateStudy = async (
  studyId: string,
  studyInput: UpdateStudyInput
) => {
  const study = await studyRef.doc(studyId).update(studyInput);
  return study;
};
