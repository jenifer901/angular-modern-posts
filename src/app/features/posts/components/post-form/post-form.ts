import { Component, signal, inject, effect, output } from '@angular/core';
import { CreatePost, PostFormData } from '../../models/create-post.model';
import { form, FormField, required } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';
import { PostsStore } from '../../store/posts.store';
import { Post } from '../../models/posts.model';
import { I18N_IMPORTS } from '../../../../shared/shared-imports';
import { PostSelectStore } from '../../store/select-post.store';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, FormField, I18N_IMPORTS],
  templateUrl: './post-form.html',
})
export class PostFormComponent {
  storePosts = inject(PostsStore);
  storeSelectPost = inject(PostSelectStore);
  titleText = '';

  submitPost = output<CreatePost>();
  submitPostUpdate = output<Post>();
  cancelPost = output<void>();

  post = this.storeSelectPost.post;

  postModel = signal<PostFormData>({
    title: '',
    body: '',
    tags: '',
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

  constructor() {
    effect(() => {
      const currentPost = this.post();

      if (currentPost) {
        this.postModel.set({
          title: currentPost.title,
          body: currentPost.body,
          tags: currentPost.tags.join(', '),
        });
      } else {
        this.postModel.set({
          title: '',
          body: '',
          tags: '',
        });
      }
    });
  }

  submit() {
    if (!this.postForm().valid()) {
      this.postForm.title().markAsTouched();
      this.postForm.body().markAsTouched();
      this.postForm.tags().markAsTouched();

      return;
    } else {
      const tagsArray = this.postForm
        .tags()
        .value()
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const currentPost = this.post();
      if (currentPost) {
        this.submitPostUpdate.emit({
          ...currentPost,
          title: this.postForm.title().value(),
          body: this.postForm.body().value(),
          tags: tagsArray,
        });
      } else {
        this.submitPost.emit({
          title: this.postForm.title().value(),
          body: this.postForm.body().value(),
          tags: tagsArray,
        });
      }
    }
  }
}
