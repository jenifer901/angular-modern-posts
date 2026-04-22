import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Post, PostsPagination } from '../models/posts.model';
import { CreatePost } from '../models/create-post.model';
import { Enviroment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly baseUrl = Enviroment.apiUrl;

  http = inject(HttpClient);

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  loadPosts(params: HttpParams): Observable<PostsPagination> {
    return this.http.get<PostsPagination>(`${this.baseUrl}/posts`, { params });
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
