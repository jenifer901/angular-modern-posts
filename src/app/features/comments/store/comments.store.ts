import { Injectable, signal, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Comment } from '../models/comment.model';
import { CommentsService } from '../service/comments.service';

@Injectable()
@Injectable()
export class CommentsStore {
  private commentsService = inject(CommentsService);

  postId = signal<string | null>(null);
    commentInput = signal<string>('');

  commentsResource = httpResource<Comment[]>(() => {
    const id = this.postId();

    return id
      ? {
          url: 'http://localhost:3000/comments',
          params: {
            postId: id,
            _expand: 'user',
          },
        }
      : undefined;
  });

  setPostId(id: string) {
    this.postId.set(id);
  }

   createComment(body: string, userId: number) {
    const postId = this.postId();
    if (!postId) return;

    this.commentsService.createComment({
      body,
      userId,
      postId,
      createdAt: new Date().toISOString()
    }).subscribe(() => {
    this.commentInput.set('');
      // 🔄 recarga automática
      this.commentsResource.reload();

    });

  }

  deleteComment(comment: Comment) {
    const loggedUser = Number(localStorage.getItem('userId'));

    if (comment.userId !== loggedUser) return;

    this.commentsService.deleteComment(comment.id).subscribe(() => this.commentsResource.reload());
  }
}
