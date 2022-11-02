import { CoreEntity } from '@entities/core.entity';
import { User } from '@entities/user.entity';

export type Announcement = {
  order: number;
  writer: Pick<User, 'name'>;
  title: string;
  content: string;
  isFixed: boolean;
} & CoreEntity;
