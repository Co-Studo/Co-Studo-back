import { Study } from '@entities/study.entity';

export type CreateStudyInput = Omit<
  Study,
  'id' | 'participants' | 'isRecruiting'
>;

export type UpdateStudyInput = Partial<CreateStudyInput>;
