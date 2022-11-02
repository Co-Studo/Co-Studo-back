import NoMatchingDocuments from '@common/exceptions/no-matching-documents';
import { CreateTagInput } from '@dtos/create-tag.dto';
import { db } from 'src/firebaseApp';

const tagRef = db.collection('tag');

export const createTag = async (tagInput: CreateTagInput) => {
  const tag = await tagRef.add(tagInput);
  return tag;
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
