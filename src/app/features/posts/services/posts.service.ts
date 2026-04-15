import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Post, PostsResponse } from '../models/posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly baseUrl = 'http://localhost:3000';

  http = inject(HttpClient);

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  loadPosts(params: HttpParams): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(`${this.baseUrl}/posts`, { params });
  }

  updatePost(id: string, post: Post) {
    return this.http.patch(`${this.baseUrl}/posts${id}`, post);
  }

  deletePost(id: string) {
    return this.http.delete(`${this.baseUrl}/posts/${id}`);
  }
}
