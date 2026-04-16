export interface Comment {
  id: number;
  postId: string;
  userId: number;
  body: string;
  createdAt: string;
  user?: User;
}

export interface User {
  id: number;
  name: string;
}
