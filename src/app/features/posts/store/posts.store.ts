import { Injectable, signal, computed, inject } from '@angular/core';
import { PostsPagination } from '../models/posts.model';
import { PostsService } from '../services/posts.service';
import { HttpParams, httpResource } from '@angular/common/http';
import { CreatePost } from '../models/create-post.model';
import { AuthStore } from '../../auth/login/store/login.store';
import { Enviroment } from '../../../../environments/environment';
import { PostFiltersForm } from '../models/filter-post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsStore {
  private postService = inject(PostsService);
  private authService = inject(AuthStore);
  private _page = signal(1);
  private _filters = signal<{
    userId?: string | null;
    tag?: string | null;
  }>({});

  searchInput = signal<string>('');

  private _addSuccess = signal<boolean>(false);
  addSuccess = this._addSuccess.asReadonly();

  postsResource = httpResource<PostsPagination>(() => {
    const page = this._page();
    const f = this._filters();
    const search = this.searchInput();

    let params = new HttpParams()
      .set('_page', page)
      .set('_per_page', 10)
      .set('_sort', '-views')
      .set('_embed', 'user');

    const where: {
      userId?: { eq: string };
      tags?: { contains: string };
      or?: { title?: { contains: string }; body?: { contains: string } }[];
    } = {};

    if (f.userId) {
      where.userId = { eq: String(f.userId) };
    }

    if (f.tag) {
      where.tags = { contains: f.tag };
    }

    if (search) {
      where.or = [{ title: { contains: search } }, { body: { contains: search } }];
    }

    if (Object.keys(where).length > 0) {
      params = params.set('_where', JSON.stringify(where));
    }

    return {
      url: `${Enviroment.apiUrl}/posts`,
      params,
    };
  });

  posts = computed(() => this.postsResource.value()?.data ?? []);
  pages = computed(() => this.postsResource.value()?.pages ?? 0);
  currentPage = computed(() => this._page());
  hasNext = computed(() => !!this.postsResource.value()?.next);
  hasPrev = computed(() => !!this.postsResource.value()?.prev);
  loading = this.postsResource.isLoading;
  items = computed(() => this.postsResource.value()?.items ?? 0);

  nextPage() {
    const next = this.postsResource.value()?.next;
    if (next) this._page.set(next);
  }

  prevPage() {
    const prev = this.postsResource.value()?.prev;
    if (prev) this._page.set(prev);
  }

  goToPage(page: number) {
    this._page.set(page);
  }

  addPosts(post: CreatePost): void {
    this.postService
      .createPosts({ ...post, userId: this.authService.userId() })
      .subscribe(() => this._addSuccess.set(true));
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
    this._page.set(1);
  }

  setFilter(filter: PostFiltersForm) {
    this._filters.set(filter);
    this._page.set(1);
  }
}
