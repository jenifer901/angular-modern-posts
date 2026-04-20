import { Injectable, signal, computed, inject } from '@angular/core';
import { Post } from '../models/posts.model';
import { PostsService } from '../services/posts.service';
import { httpResource } from '@angular/common/http';
import { AuthStore } from '../../auth/login/store/login.store';
import { Enviroment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PostSelectStore {
  private postService = inject(PostsService);

  private _postId = signal<string | null>(null);

  private _deleteSuccess = signal<boolean>(false);
  deleteSuccess = this._deleteSuccess.asReadonly();

  private _updateSuccess = signal<boolean>(false);
  updateSuccess = this._updateSuccess.asReadonly();

  setPostId(id: string) {
    this._postId.set(id);
  }

  private _postResource = httpResource<Post>(() => {
    const id = this._postId();

    if (!id) return undefined;

    return {
      url: `${Enviroment.apiUrl}/posts/${id}`,
      params: { _expand: 'user' },
    };
  });

  post = computed(() => this._postResource.value());
  loading = this._postResource.isLoading;
  error = this._postResource.error;

  private authStore = inject(AuthStore);

  //isForbidden es como se tiene que llamar
  isOwner = computed(() => {
    const post = this.post();
    const userId = this.authStore.userId();

    if (!post || !userId) return null;

    return Number(post.userId) === Number(userId);
  });

  updatePost(post: Post): void {
    this.postService.updatePost(post.id!, post).subscribe(() => {
      this._postResource.reload();
      this._updateSuccess.set(true);
    });
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe(() => {
      this._deleteSuccess.set(true);
    });
  }

  resetDeleteState() {
    this._deleteSuccess.set(false);
  }

  resetUpdateState() {
    this._updateSuccess.set(false);
  }
}
