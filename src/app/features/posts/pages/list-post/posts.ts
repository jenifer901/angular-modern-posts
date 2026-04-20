import { Component, inject, computed, DestroyRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardPosts } from '../../components/card-posts/card-posts';
import { CommonModule } from '@angular/common';
import { PaginationPost } from '../../components/pagination-posts/pagination-posts';
import { FiltersPosts, PostFiltersForm } from '../../components/filters-posts/filters-posts';
import { Router } from '@angular/router';
import { PostsStore } from '../../store/posts.store';
import { I18N_IMPORTS } from '../../../../shared/shared-imports';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-posts',
  imports: [CardPosts, FiltersPosts, CommonModule, PaginationPost, I18N_IMPORTS],
  templateUrl: './posts.html',
  standalone: true,
})
export class Posts {
  readonly countPost = 10;
  storePosts = inject(PostsStore);
  router = inject(Router);
  private translate = inject(TranslateService);

  posts = this.storePosts.posts;
  loading = this.storePosts.loading;

  // 🔹 derivados
  authorFilter = this.storePosts.authors;
  tagFilter = this.storePosts.tags;
  currentPage = this.storePosts.currentPage;
  totalPages = this.storePosts.pages;
  hasNext = this.storePosts.hasNext;
  hasPrev = this.storePosts.hasPrev;

  goToPage = (page: number) => this.storePosts.goToPage(page);
  nextPage = () => this.storePosts.nextPage();
  prevPage = () => this.storePosts.prevPage();
  totalItems = this.storePosts.items;

  destroyRef = inject(DestroyRef);

  constructor() {
    this.storePosts.resetFilters();
  }

  private resultsTranslation = toSignal(this.translate.stream('RESULTS.SHOWING'), {
    initialValue: '',
  });

  resultsText = computed(() => {
    const template = this.resultsTranslation();

    const shown = this.posts().length;
    const total = this.totalItems();

    return template.replace('{{shown}}', String(shown)).replace('{{total}}', String(total));
  });

  setFilter(filters: PostFiltersForm) {
    this.storePosts.setFilter(filters);
  }

  postCardClasses = (odd: boolean) => (odd ? 'bg-gray-50' : 'bg-gray-100');

  get pagesArray() {
    return Array.from({ length: this.storePosts.pages() }, (_, i) => i + 1);
  }

  addPost() {
    this.router.navigate(['/posts/new']);
  }
}
