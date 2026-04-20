import { Component, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { PostsStore } from '../../store/posts.store';
import { CreatePost } from '../../models/create-post.model';
import { PostFormComponent } from '../../components/post-form/post-form';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-create-post-page',
  standalone: true,
  imports: [PostFormComponent, TranslateModule],
  templateUrl: './create-post.html',
})
export class CreatePostPageComponent {
  private storePosts = inject(PostsStore);
  private router = inject(Router);

  loading = this.storePosts.loading;

  constructor() {
    effect(() => {
      if (this.storePosts.addSuccess()) {
        this.goBack();

        this.storePosts.resetAddteState();
      }
    });
  }

  createPost(post: CreatePost) {
    this.storePosts.addPosts(post);
  }

  goBack() {
    this.router.navigate(['/posts']);
  }
}
