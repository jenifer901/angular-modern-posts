import { Component, inject } from '@angular/core';
import { PostsStore } from '../../store/posts.store';
import { I18N_IMPORTS } from '../../../../shared/shared-imports';

@Component({
  selector: 'app-search-post',
  imports: [I18N_IMPORTS],
  template: `<input
    class="border-gray-300 bg-gray-200 border rounded-lg px-3 py-2 text-smhover:border-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
    type="text"
    [placeholder]="'HEADER.SEARCH' | translate"
    [value]="store.searchInput()"
    (blur)="store.searchInput.set($any($event.target).value)"
  />`,
})
export class SearchPost {
  store = inject(PostsStore);
}
