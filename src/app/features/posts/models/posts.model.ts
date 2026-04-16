import { User } from '../../../core/models/user.model';

export interface Post {
  id: string | null;
  userId: number;
  title: string;
  body: string;
  tags: string[];
  createdAt: Date;
  user?: User;
  comment?: Comment;
}

export interface PostsPagination {
  data: Post[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
}

export type PageItem = { type: 'page'; value: number } | { type: 'ellipsis' };
