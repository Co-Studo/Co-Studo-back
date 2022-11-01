import { Comment } from '@entities/comment.entity';

export type Announcement = {
  order: number;
  userId: string;
  title: string;
  content: string;
  comments: Comment[];
};
