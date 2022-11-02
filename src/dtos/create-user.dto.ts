import { User } from '@entities/user.entity';

export type CreateUserInput = Pick<User, 'email'> & {
  uid: string;
};
