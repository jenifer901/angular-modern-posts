export interface CreatePost {
  title: string;
  body: string;
  tags: string[];
  userId?: string;
}
