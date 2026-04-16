import { Component, inject, computed, DestroyRef } from '@angular/core';

import { CardPosts } from '../../components/card-posts/card-posts';
import { CommonModule } from '@angular/common';
import { PaginationPost } from '../../components/pagination-posts/pagination-posts';
import { FiltersPosts, PostFiltersForm } from '../../components/filters-posts/filters-posts';
import { Router } from '@angular/router';
import { PostsStore } from '../../store/posts.store';

@Component({
  selector: 'app-posts',
  imports: [CardPosts, FiltersPosts, CommonModule, PaginationPost],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
  standalone: true,
})
export class Posts {
  readonly countPost = 10;
  storePosts = inject(PostsStore);
  router = inject(Router);

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
    // siempre que navega limpia los filtros
    this.destroyRef.onDestroy(() => {
      this.storePosts.resetFilters();
    });
  }

  resultsText = computed(() => {
    return `Mostrando ${this.posts().length} de ${this.totalItems()} resultados`;
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
