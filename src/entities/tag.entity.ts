import { Study } from '@entities/study.entity';

export type Tag = {
  name: string;
  studies: Study[];
};
