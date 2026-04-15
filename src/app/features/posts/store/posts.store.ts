import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { Post, PostsResponse } from '../models/posts.model';
import { PostsService } from '../services/posts.service';
import { HttpParams } from '@angular/common/http';
import { CreatePost } from '../models/create-post.model';
import { PostFiltersForm } from '../components/filters-posts/filters-posts';
import { Observable, tap } from 'rxjs';

/**
 * uso de signals
 * tipo de signal computed
 * estado reactivo
 */

@Injectable({
  providedIn: 'root',
})
export class PostsStore {
  private postService = inject(PostsService);

  private _response = signal<PostsResponse | null>(null);
  private _loading = signal(false);
  private _page = signal(1);
  private _filters = signal<{
    userId?: string | null;
    tag?: string | null;
    search?: string | null;
  }>({});
  private _selectedPost = signal<Post | null>(null);
  selectedPost = this._selectedPost.asReadonly();

  private _deleteSuccess = signal<boolean>(false);
  deleteSuccess = this._deleteSuccess.asReadonly();

  posts = computed(() => this._response()?.data ?? []);
  pages = computed(() => this._response()?.pages ?? 0);
  currentPage = computed(() => this._page());
  hasNext = computed(() => !!this._response()?.next);
  hasPrev = computed(() => !!this._response()?.prev);
  loading = computed(() => this._loading());
  items = computed(() => this._response()?.items ?? 0);

  constructor() {
    effect(() => {
      this._filters(); // 👈 dependencia reactiva
      this.loadPosts(1); // reset página al filtrar
    });
  }

  loadPost(id: string) {
    this._loading.set(true);

    this.postService.getPost(id).subscribe((post) => {
      this._selectedPost.set(post);
      this._loading.set(false);
    });
  }

  loadPosts(page: number): void {
    this._loading.set(true);
    const f = this._filters();

    let params = new HttpParams().set('_page', page).set('_per_page', 3).set('_sort', '-views');
    //.set('_expand', 'user');

    /**TODO: optimizar la carga con los filtros, es necesario que se haga por aqui ya que me cargo la paginacion */
    if (f.userId) {
      params = params.append('userId', f.userId);
    }

    this.postService.loadPosts(params).subscribe({
      next: (res: PostsResponse) => {
        this._response.set(res);
        this._page.set(page);
        this._loading.set(false);
      },
      error: () => this._loading.set(false),
    });
  }

  deletePost(id: string) {
    this._loading.set(true);

    this.postService.deletePost(id).subscribe(() => {
      this._page.set(1);
      this._deleteSuccess.set(true);
      this._selectedPost.set(null);
      this._loading.set(false);
    });
  }

  resetDeleteState() {
    this._deleteSuccess.set(false);
  }

  nextPage() {
    const next = this._response()?.next;
    if (next) this.loadPosts(next);
  }

  prevPage() {
    const prev = this._response()?.prev;
    if (prev) this.loadPosts(prev);
  }

  goToPage(page: number) {
    this.loadPosts(page);
  }

  addPosts(post: CreatePost): Observable<Post> {
    this._loading.set(true);
    return this.postService.createPosts({ ...post, userId: '1' }).pipe(
      tap(() => {
        this._loading.set(false);
      }),
    );
  }

  setFilter(filter: PostFiltersForm) {
    this._filters.update(() => filter);
  }
}
