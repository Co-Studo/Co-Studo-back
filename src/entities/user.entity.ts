import { Study } from '@entities/study.entity';

export type User = {
  email: string;
  studies: Study[];
};
