import NoMatchingDocuments from '@common/exceptions/no-matching-documents';
import { CreateAnnouncementInput } from '@dtos/create-announcement.dto';
import { db } from 'src/firebaseApp';

const studyRef = db.collection('study');

export const createAnnouncement = async (
  studyId: string,
  announcementInput: CreateAnnouncementInput
) => {
  const fakeUser = { name: '파크' }; // TODO: 유저 정보 가져오기
  const announcementRef = await studyRef
    .doc(studyId)
    .collection('announcements');
  const order = await announcementRef.orderBy('order', 'desc').limit(1).get(); // TODO: 무거운 작업일까요?

  const defaultInput = {
    order: order.empty ? 1 : order.docs[0].data().order + 1,
    user: fakeUser, // TODO: 유저 정보 가져오기
  };

  const input = {
    ...defaultInput,
    ...announcementInput,
  };

  const announcement = announcementRef.add(input);

  return announcement;
};

export const getAnnouncementsByStudyId = async (
  studyId: string,
  isFixed = false
) => {
  const snapshot = await studyRef
    .doc(studyId)
    .collection('announcements')
    .where('isFixed', '==', isFixed)
    .get();

  if (snapshot.empty) {
    throw new NoMatchingDocuments('getAnnouncementsByStudyId');
  }

  return snapshot.docs.map((doc) => doc.data());
};
