import { Study } from '@entities/study.entity';

export type CreateStudyInput = Omit<
  Study,
  | 'id'
  | 'ownerId'
  | 'participantIds'
  | 'isRecruiting'
  | 'createdAt'
  | 'updatedAt'
>;

export type UpdateStudyInput = Partial<CreateStudyInput>;
