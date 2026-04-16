import { Component, inject, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsStore } from '../../store/posts.store';
import { CommentsListComponent } from '../../../comments/comments';

@Component({
  selector: 'app-detail-post',
  imports: [CommentsListComponent],
  templateUrl: './detail-post.html',
  styleUrl: './detail-post.css',
  standalone: true,
})
export class DetailPost {
  private route = inject(ActivatedRoute);
  store = inject(PostsStore);
  router = inject(Router);

  showDeleteModal = signal(false);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');

      if (id) {
        this.store.loadPost(id);
      }
    });

    effect(() => {
      if (this.store.deleteSuccess()) {
        this.router.navigate(['/posts']);

        this.store.resetDeleteState();
      }
    });
  }

  openDeleteModal() {
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
  }

  confirmDelete() {
    const id = this.store.selectedPost()?.id;

    if (!id) return;

    this.store.deletePost(id);
  }
}
