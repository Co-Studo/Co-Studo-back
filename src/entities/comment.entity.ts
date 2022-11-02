import { CoreEntity } from '@entities/core.entity';

export type Comment = {
  userId: string;
  content: string;
} & CoreEntity;
