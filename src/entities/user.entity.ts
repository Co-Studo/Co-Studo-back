import { CoreEntity } from '@entities/core.entity';

export type User = {
  email: string;
  name: string;
} & CoreEntity;
