import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  getComments(postId: number) {
    return this.http.get<Comment[]>(`${this.baseUrl}/comments?postId=${postId}&_expand=user`);
  }

  createComment(comment: Partial<Comment>) {
    return this.http.post<Comment>(`${this.baseUrl}/comments`, comment);
  }

  deleteComment(id: number) {
    return this.http.delete(`${this.baseUrl}/comments/${id}`);
  }
}
