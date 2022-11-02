import { Tag } from '@entities/tag.entity';

export type CreateTagInput = Pick<Tag, 'name'>;
