import { User } from '../../../core/models/user.model';

export interface Post {
  id: string;
  userId: number;
  title: string;
  body: string;
  tags: string[];
  createdAt: Date;
  user?: User;
  comment?: Comment;
}

export interface PostsResponse {
  data: Post[];
  first: number;
  items: number;
  last: number;
  next: number;
  pages: number;
  prev: number;
}

export type PageItem = { type: 'page'; value: number } | { type: 'ellipsis' };
