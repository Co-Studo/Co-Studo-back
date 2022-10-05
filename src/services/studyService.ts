import NoMatchingDocuments from '@common/exceptions/no-matching-documents';
import { CreateTagInput } from '@dtos/create-tag.dto';
import { CreateStudyInput, UpdateStudyInput } from '@dtos/study.dto';
import { db } from 'src/firebaseApp';

const studyRef = db.collection('study');
const tagRef = db.collection('tag');

export const createTag = async (tagInput: CreateTagInput) => {
  const tag = await tagRef.add(tagInput);
  return tag;
};

export const updateStudy = async (
  studyId: string,
  studyInput: UpdateStudyInput
) => {
  const study = await studyRef.doc(studyId).update(studyInput);
  return study;
};

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
    throw new NoMatchingDocuments('getRecruitingStudies');
  }
  return snapshot.docs.map((doc) => doc.data());
};

export const getTags = async () => {
  const snapshot = await tagRef.get();
  if (snapshot.empty) {
    throw new NoMatchingDocuments('getTags');
  }
  return snapshot.docs.map((doc) => doc.data());
};

export const getTagById = async (tagId: string) => {
  const snapshot = await tagRef.doc(tagId).get();
  if (!snapshot.exists) {
    throw new NoMatchingDocuments('getTagById');
  }
  return snapshot.data();
};
