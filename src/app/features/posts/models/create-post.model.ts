export interface CreatePost {
  title: string;
  body: string;
  tags: string[];
  userId?: string | null;
}

export interface PostFormData {
  title: string;
  body: string;
  tags: string;
}
