import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PostSelectStore } from '../../features/posts/store/select-post.store';


export const postResolver: ResolveFn<boolean> = (route) => {
  const store = inject(PostSelectStore);
  const postId = route.params['id'];

  if (!postId) return false;

  store.setPostId(postId);

  return true;
};