import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { Post, PostsPagination } from '../models/posts.model';
import { PostsService } from '../services/posts.service';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { CreatePost } from '../models/create-post.model';
import { PostFiltersForm } from '../components/filters-posts/filters-posts';
import { AuthStore } from '../../auth/login/store/login.store';
import { SelectAuthor } from '../models/select-author.model';

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
  }>({});

  searchInput = signal<string>('');

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

  private _addSuccess = signal<boolean>(false);
  addSuccess = this._addSuccess.asReadonly();

  constructor() {
    effect(() => {
      this._filters(); // dependencia reactiva
      this.searchInput();
      this.loadPosts(1); // reset página al filtrar
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

    if (f.userId) {
      params = params.append('userId', f.userId);
    }

    if (f.tag) {
      params = params.append('tags_like', f.tag);
    }

    if (this.searchInput()) {
      params = params.append('q', this.searchInput());
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

  addPosts(post: CreatePost): void {
    this._loading.set(true);
    this.postService.createPosts({ ...post, userId: this.authService.userId() }).subscribe({
      next: () => {
        this._addSuccess.set(true);
        this._loading.set(false);
      },
      error: () => {
        this._loading.set(false);
      },
    });
  }

  resetAddteState() {
    this._addSuccess.set(false);
  }

  resetFilters() {
    this._filters.set({
      userId: null,
      tag: null,
    });
    this.searchInput.set('');
  }

  setFilter(filter: PostFiltersForm) {
    this._filters.update(() => filter);
  }
}
