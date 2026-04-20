import { Component, inject, effect, input } from '@angular/core';
import { CommentsStore } from './store/comments.store';
import { AddComment } from './components/add-comment/add-comment';
import { DetailComment } from './components/detail-comment/detail-comment';
import { I18N_IMPORTS } from '../../shared/shared-imports';

@Component({
  selector: 'app-comments-list',
  standalone: true,
  templateUrl: './comments.html',
  providers: [CommentsStore],
  imports: [AddComment, DetailComment, I18N_IMPORTS],
})
export class CommentsListComponent {
  store = inject(CommentsStore);

  comments = this.store.comments;
  loading = this.store.loading;
  error = this.store.error;
  isEmpty = this.store.isEmpty;

  postId = input<string | null>();
  userId = input.required<number>();

  constructor() {
    effect(() => {
      const id = this.postId();

      if (id) {
        this.store.setPostId(id);
      }
    });
  }
}
