import { Injectable, signal, inject, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Comment } from '../models/comment.model';
import { CommentsService } from '../service/comments.service';
import { Enviroment } from '../../../../environments/environment';

@Injectable()
export class CommentsStore {
  private commentsService = inject(CommentsService);

  postId = signal<string | null>(null);

  editingCommentId = signal<number | null>(null);

  editText = signal('');

  commentsResource = httpResource<Comment[]>(() => {
    const id = this.postId();

    return id
      ? {
          url: `${Enviroment.apiUrl}/comments`,
          params: {
            postId: id,
            _expand: 'user',
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
    const userId = Number(localStorage.getItem('userId'));
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
    const loggedUser = Number(localStorage.getItem('userId'));

    if (comment.userId !== loggedUser) return;

    this.commentsService.deleteComment(comment.id).subscribe(() => this.commentsResource.reload());
  }

  startEdit(comment: Comment) {
    this.editingCommentId.set(comment.id);
    this.editText.set(comment.body);
  }

  cancelEdit() {
    this.editingCommentId.set(null);
  }

  updateComment(id: number, body: string) {
    this.commentsService.updateComment(id, body).subscribe(() => {
      this.commentsResource.reload();
    });
  }
}
