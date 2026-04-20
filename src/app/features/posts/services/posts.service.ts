import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Post } from '../models/posts.model';
import { CreatePost } from '../models/create-post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly baseUrl = 'http://localhost:3000';

  http = inject(HttpClient);

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  loadPosts(params: HttpParams): Observable<HttpResponse<Post[]>> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`, { params, observe: 'response' });
  }

  createPosts(post: CreatePost): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, post);
  }

  updatePost(id: string, post: Post): Observable<Post> {
    return this.http.patch<Post>(`${this.baseUrl}/posts/${id}`, post);
  }

  deletePost(id: string) {
    return this.http.delete(`${this.baseUrl}/posts/${id}?_dependent=comments`);
  }
}
