import { Component, inject, Input } from '@angular/core';
import { CommentsStore } from './store/comments.store';
import { AddComment } from './components/add-comment/add-comment';
import { DetailComment } from './components/detail-comment/detail-comment';

@Component({
  selector: 'app-comments-list',
  standalone: true,
  templateUrl: './comments.html',
  providers: [CommentsStore],
  imports: [AddComment, DetailComment],
})
export class CommentsListComponent {
  store = inject(CommentsStore);

  @Input()
  set postId(id: string | null | undefined) {
    if (id) this.store.setPostId(id);
  }
}
