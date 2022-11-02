import { CoreEntity } from '@entities/core.entity';
import { Tag } from '@entities/tag.entity';
import { User } from '@entities/user.entity';

export type Study = {
  title: string;
  shortDescription: string;
  description: string;
  owner: User;
  maxParticipants?: number;
  tags: Tag[];
  isRecruiting: boolean;
  isPublic: boolean;
  startedAt: Date;
  endedAt?: Date;
  isRequireCheckIn: boolean;
  isRequireCheckOut: boolean;
  isCheckOutIsArticle: boolean;
} & CoreEntity;
