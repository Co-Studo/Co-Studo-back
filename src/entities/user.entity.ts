import { CoreEntity } from '@entities/core.entity';

export type User = {
  studyIds: string[];
} & CoreEntity;
