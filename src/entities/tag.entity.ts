import { Study } from '@entities/study.entity';

export type Tag = {
  id: string;
  name: string;
  studies: Study[];
};
