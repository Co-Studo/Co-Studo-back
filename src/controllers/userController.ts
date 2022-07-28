import { getDate, sendMethodResult } from '@common/utils';
import User from '@models/User';

export const getUsers = sendMethodResult(async () => {
  const users = await User.find();
  return users;
});

export const getUser = sendMethodResult(async (req) => {
  const { id } = req.params;
  const user = await User.findById(id);
  return user;
});

export const createUser = sendMethodResult(async (req) => {
  const createdAt = getDate();
  const updatedAt = createdAt;
  const newUserData = {
    ...req.body,
    createdAt,
    updatedAt,
  };
  const newUser = await User.create(newUserData);

  return newUser;
});
