import { Component, Output, EventEmitter, signal, inject } from '@angular/core';
import { CreatePost, PostFormData } from '../../models/create-post.model';
import { form, FormField, required } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';
import { PostsStore } from '../../store/posts.store';
import { Post } from '../../models/posts.model';



@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, FormField],
  templateUrl: './post-form.html',
})
export class PostFormComponent {
  storePosts = inject(PostsStore);

  @Output() submitPost = new EventEmitter<CreatePost>();
  @Output() submitPostUpdate = new EventEmitter<Post>();
  @Output() cancelPost = new EventEmitter<void>();

  postModel = signal<PostFormData>({
    title: '',
    body: '',
    tags: ''
  });

  postForm = form(this.postModel, (schemaPath) => {
    required(schemaPath.title, {
      message: 'Título requerido',
    });

    required(schemaPath.body, {
      message: 'Contenido requerido',
    });

    required(schemaPath.tags, {
      message: 'Tags requeridos',
    });
  });

  constructor(){
   const post = this.storePosts.selectedPost();

if (post) {
  const { title, body, tags } = post;

  this.postModel.set({
    title,
    body,
    tags: tags.join(', ')
  });
}
}

  submit() {
    if (!this.postForm().valid()) {
      this.postForm.title().markAsTouched();
      this.postForm.body().markAsTouched();
      this.postForm.tags().markAsTouched();

      return;
    } else {
       const post = this.storePosts.selectedPost();
      const tagsArray = this.postForm
        .tags()
        .value()
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);


if (post) {
  this.submitPostUpdate.emit({
        ...post,
        title: this.postForm.title().value(),
        body: this.postForm.body().value(),
        tags: tagsArray
      });
} else {
  this.submitPost.emit({
        title: this.postForm.title().value(),
        body: this.postForm.body().value(),
        tags: tagsArray
      });
    }
  }
  }
}
