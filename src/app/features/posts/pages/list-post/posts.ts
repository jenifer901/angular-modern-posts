import { Component, inject, computed } from '@angular/core';
import { PostsStore } from '../../store/posts.store';
import { CardPosts } from '../../components/card-posts/card-posts';
import { CommonModule } from '@angular/common';
import { PaginationPost } from '../../components/pagination-posts/pagination-posts';
import { FiltersPosts, PostFiltersForm } from '../../components/filters-posts/filters-posts';
import { Router } from '@angular/router';

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
  currentPage = this.storePosts.currentPage;
  totalPages = this.storePosts.pages;
  hasNext = this.storePosts.hasNext;
  hasPrev = this.storePosts.hasPrev;

  goToPage = (page: number) => this.storePosts.goToPage(page);
  nextPage = () => this.storePosts.nextPage();
  prevPage = () => this.storePosts.prevPage();
  totalItems = this.storePosts.items;

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
