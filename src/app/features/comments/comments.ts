import { Component, inject, Input } from '@angular/core';
import { CommentsStore } from './store/comments.store';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-comments-list',
  standalone: true,
  templateUrl: './comments.html',
  providers: [CommentsStore],
})
export class CommentsListComponent {
  store = inject(CommentsStore);
  authService = inject(AuthService);

  userId = Number(this.authService.getUserId());


  @Input()
  set postId(id: string | null | undefined) {
    if (id) this.store.setPostId(id);
  }

}
