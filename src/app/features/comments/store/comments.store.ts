import { Injectable, signal, inject, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Comment } from '../models/comment.model';
import { CommentsService } from '../service/comments.service';
import { Enviroment } from '../../../../environments/environment';
import { AuthStore } from '../../auth/login/store/login.store';

@Injectable()
export class CommentsStore {
  private authStore = inject(AuthStore);
  private commentsService = inject(CommentsService);

  postId = signal<string | null>(null);

  editingCommentId = signal<string | null>(null);

  editText = signal('');

  commentsResource = httpResource<Comment[]>(() => {
    const id = this.postId();

    return id
      ? {
          url: `${Enviroment.apiUrl}/comments`,
          params: {
            _where: JSON.stringify({
              postId: { eq: String(id) },
            }),
            _embed: 'user',
          },
        }
      : undefined;
  });

  comments = this.commentsResource.value;
  loading = this.commentsResource.isLoading;
  error = this.commentsResource.error;
  isEmpty = computed(() => !this.loading() && !this.comments());

  setPostId(id: string) {
    this.postId.set(id);
  }

  createComment(body: string) {
    const userId = this.authStore.userId();
    const postId = this.postId();
    if (!postId) return;

    const comment = {
      body,
      userId,
      postId,
      createdAt: new Date().toISOString(),
    };

    this.commentsService.createComment(comment).subscribe(() => {
      // recarga automática
      this.commentsResource.reload();
    });
  }

  deleteComment(comment: Comment) {
    const loggedUserId = this.authStore.userId();

    if (comment.userId !== loggedUserId) return;

    this.commentsService.deleteComment(comment.id).subscribe(() => this.commentsResource.reload());
  }

  startEdit(comment: Comment) {
    this.editingCommentId.set(comment.id);
    this.editText.set(comment.body);
  }

  cancelEdit() {
    this.editingCommentId.set(null);
  }

  updateComment(id: string, body: string) {
    this.commentsService.updateComment(id, body).subscribe(() => {
      this.commentsResource.reload();
    });
  }
}
