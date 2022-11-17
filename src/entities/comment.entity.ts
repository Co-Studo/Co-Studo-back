import { CoreEntity } from '@entities/core.entity';

export type Comment = {
  uid: string;
  content: string;
} & CoreEntity;
