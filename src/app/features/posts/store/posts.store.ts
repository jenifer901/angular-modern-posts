import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { Post, PostsPagination } from '../models/posts.model';
import { PostsService } from '../services/posts.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { CreatePost } from '../models/create-post.model';
import { PostFiltersForm } from '../components/filters-posts/filters-posts';
import { Observable, tap } from 'rxjs';
import { AuthStore } from '../../auth/login/store/login.store';
import { SelectAuthor } from '../models/select-author.model';

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
  private authService = inject(AuthStore);

  private _response = signal<PostsPagination | null>(null);
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

  authors = computed(() => {
    const posts = this.posts();
    const authorsArray = new Map();
    posts.forEach((p) => {
      authorsArray.set(p.userId, p.user?.name);
    });

    return Array.from(authorsArray.entries()).map(
      ([id, name]) =>
        ({
          id,
          name,
        }) as SelectAuthor,
    );
  });

  tags = computed(() => {
    const posts = this.posts();
    const allTags = posts.flatMap((p) => p.tags ?? []);
    return [...new Set(allTags)];
  });

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

    let params = new HttpParams()
      .set('_page', page)
      .set('_per_page', 10)
      .set('_sort', '-views')
      .set('_expand', 'user');

    /**TODO: optimizar la carga con los filtros, es necesario que se haga por aqui ya que me cargo la paginacion */
    if (f.userId) {
      params = params.append('userId', f.userId);
    }

    if (f.tag) {
      params = params.append('tags_like', f.tag);
    }

    this.postService.loadPosts(params).subscribe({
      next: (res: HttpResponse<Post[]>) => {
        this.getPagination(page, res);
      },
      error: () => this._loading.set(false),
    });
  }

  getPagination(page: number, res: HttpResponse<Post[]>) {
    const items = Number(res.headers.get('X-Total-Count'));
    const pages = Math.ceil(items / 10);
    const obj: PostsPagination = {
      first: 1,
      last: items,
      items,
      data: res.body ?? [],
      next: page + 1 <= pages ? page + 1 : null,
      pages,
      prev: page - 1 >= 1 ? page - 1 : null,
    };
    this._response.set(obj);
    this._page.set(page);
    this._loading.set(false);
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
    return this.postService.createPosts({ ...post, userId: this.authService.userId() }).pipe(
      tap(() => {
        this._loading.set(false);
      }),
    );
  }

  resetFilters() {
    this._filters.set({
      userId: null,
      tag: null,
      search: null,
    });
  }

  setFilter(filter: PostFiltersForm) {
    this._filters.update(() => filter);
  }
}
