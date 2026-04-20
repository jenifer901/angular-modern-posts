import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PostSelectStore } from '../../features/posts/store/select-post.store';
import { AuthStore } from '../../features/auth/login/store/login.store';

export const ownerGuard: CanActivateFn = () => {
  const store = inject(PostSelectStore);
  const auth = inject(AuthStore)
  const router = inject(Router);

  const post = store.post;
  const userId = auth.userId;

  if (!post || !userId) {
    return router.createUrlTree(['/posts']);
  }

  const isOwner = Number(post()?.userId) === Number(userId());

  return isOwner ? true : router.createUrlTree(['/posts']);
};