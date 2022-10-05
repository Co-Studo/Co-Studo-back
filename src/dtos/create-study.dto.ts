import { Study } from '@entities/study.entity';

export type CreateStudyInput = Omit<
  Study,
  'id' | 'participants' | 'isRecruiting'
>;
