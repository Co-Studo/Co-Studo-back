import { User } from '@common/entities/User';

export const findAll = async (): Promise<User[]> => [];

export const findById = async (id: string): Promise<User> => ({
  email: 'asd',
  nickname: 'asd',
  avatartUrl: 'asd',
  createdAt: new Date(),
  updatedAt: new Date(),
});
