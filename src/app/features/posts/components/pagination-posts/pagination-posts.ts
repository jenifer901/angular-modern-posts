import { Component, input, output, computed } from '@angular/core';
import { PageItem } from '../../models/posts.model';

@Component({
  selector: 'app-pagination-posts',
  templateUrl: './pagination-posts.html',
  standalone: true,
  styleUrl: './pagination-posts.css',
})
export class PaginationPost {
  // 📥 inputs
  totalPages = input.required<number>();
  currentPage = input.required<number>();

  // 📤 output
  pageChange = output<number>();

  // 🧠 pagination logic
  items = computed<PageItem[]>(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    const items: PageItem[] = [];

    const left = Math.max(2, current);
    const right = Math.min(total - 1, current);

    items.push({ type: 'page', value: 1 });

    if (left > 2) {
      items.push({ type: 'ellipsis' });
    }

    for (let i = left; i <= right; i++) {
      items.push({ type: 'page', value: i });
    }

    if (right < total - 1) {
      items.push({ type: 'ellipsis' });
    }

    if (total > 1) {
      items.push({ type: 'page', value: total });
    }

    return items;
  });

  // 🎯 helpers
  selectPage(page: number) {
    this.pageChange.emit(page);
  }

  isActive(page: number) {
    return page === this.currentPage();
  }

  pageClasses = (page: number) =>
    this.isActive(page)
      ? 'bg-blue-600 text-white border-blue-600'
      : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-100';
}
