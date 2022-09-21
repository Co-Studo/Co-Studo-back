import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import db from 'src/db';

type CheckIn = {
  studyId: string;
  userId: string;
  checkinAt: Date;
};

type CheckOut = {
  studyId: string;
  userId: string;
  checkoutAt: Date;
};

export const getCheckIns = async (studyId: string): Promise<CheckIn[]> => {
  const checkInQuery = query(
    collection(db, 'checkin'),
    where('studyId', '==', studyId)
  );
  const checkInSnapshot = await getDocs(checkInQuery);
  return checkInSnapshot.docs.map((doc) => doc.data() as CheckIn);
};

export const getCheckOuts = async (studyId: string): Promise<CheckOut[]> => {
  const checkOutQuery = query(
    collection(db, 'checkOut'),
    where('studyId', '==', studyId)
  );
  const checkOutSnapshot = await getDocs(checkOutQuery);
  return checkOutSnapshot.docs.map((doc) => doc.data() as CheckOut);
};
