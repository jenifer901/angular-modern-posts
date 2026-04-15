import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CreatePost } from '../../models/create-post.model';
import { form, FormField, required } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';

interface PostFormData {
  title: string;
  body: string;
  tags: string;
}

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, FormField],
  templateUrl: './post-form.html',
})
export class PostFormComponent {
  @Output() submitPost = new EventEmitter<CreatePost>();
  @Output() cancelPost = new EventEmitter<void>();

  /***TODO: es necesario meter los validadores en este apartado de los campos y los mensajes */

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

      this.submitPost.emit({
        title: this.postForm.title().value(),
        body: this.postForm.body().value(),
        tags: tagsArray,
      });
    }
  }
}
