import { Tag } from '@entities/tag.entity';
import { User } from '@entities/user.entity';

export type Study = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  owner: User;
  participants: User[];
  maxParticipants?: number;
  tags: Tag[];
  isRecruiting: boolean;
  isPublic: boolean;
  startedAt: Date;
  endedAt?: Date;
  isRequireCheckIn: boolean;
  isRequireCheckOut: boolean;
  isCheckOutIsArticle: boolean;
  //   articles?: Article[];
  //   announcements: Announcement[];
};
