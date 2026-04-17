import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostsStore } from '../../store/posts.store';
import { PostFormComponent } from '../../components/post-form/post-form';
import { Post } from '../../models/posts.model';

@Component({
  selector: 'app-edit-post',
  imports: [PostFormComponent],
  templateUrl: './edit-post.html',
  styleUrl: './edit-post.css',
})
export class EditPost {
    storePosts = inject(PostsStore);
   private router = inject(Router);

  loading = this.storePosts.loading;

updatePost(post: Post){
  this.storePosts.updatePost(post).subscribe(() => {
      this.goBack();
    });
}


  goBack() {
    this.router.navigate(['/posts']);
  }
}
