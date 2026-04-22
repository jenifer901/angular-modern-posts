export interface Comment {
  id: string;
  postId: string;
  userId: string | null;
  body: string;
  createdAt: string;
  user?: User;
}

export interface User {
  id: string;
  name: string;
}
