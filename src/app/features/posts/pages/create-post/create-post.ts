import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostsStore } from '../../store/posts.store';
import { CreatePost } from '../../models/create-post.model';
import { PostFormComponent } from '../../components/post-form/post-form';

@Component({
  selector: 'app-create-post-page',
  standalone: true,
  imports: [PostFormComponent],
  templateUrl: './create-post.html',
})
export class CreatePostPageComponent {
  private storePosts = inject(PostsStore);
  private router = inject(Router);

  loading = this.storePosts.loading;

  createPost(post: CreatePost) {
    this.storePosts.addPosts(post).subscribe(() => {
      this.router.navigate(['/posts']);
    });
  }

  goBack() {
    this.router.navigate(['/posts']);
  }
}
