import { CreateStudyInput } from '@dtos/create-study.dto';
import { db } from 'src/firebaseApp';

const studyRef = db.collection('study');

export const createStudy = async (studyInput: CreateStudyInput) => {
  const defaultStudyInput = {
    isRecruiting: true,
    participants: [],
  };
  const study = await studyRef.add({
    ...defaultStudyInput,
    ...studyInput,
  });
  return study;
};

export const getRecruitingStudies = async () => {
  const snapshot = await studyRef.where('isRecruiting', '==', true).get();
  if (snapshot.empty) {
    throw Error('No matching documents.');
  }
  return snapshot.docs.map((doc) => doc.data());
};

export const getTags = async () => {
  const snapshot = await db.collection('tag').get();
  if (snapshot.empty) {
    throw Error('No matching documents.');
  }
  return snapshot.docs.map((doc) => doc.data());
};

export const getTagById = async (tagId: string) => {
  const snapshot = await db.collection('tag').doc(tagId).get();
  if (!snapshot.exists) {
    throw Error('No matching documents.');
  }
  return snapshot.data();
};
