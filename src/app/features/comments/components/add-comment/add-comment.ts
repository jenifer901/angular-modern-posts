import { Component, inject, signal } from '@angular/core';
import { CommentsStore } from '../../store/comments.store';
import { FormField, form, required } from '@angular/forms/signals';

@Component({
  selector: 'app-add-comment',
  imports: [FormField],
  templateUrl: './add-comment.html',
})
export class AddComment {
  store = inject(CommentsStore);

  commentModel = signal<{ body: string }>({
    body: '',
  });

  commentForm = form(this.commentModel, (schemaPath) => {
    required(schemaPath.body, {
      message: 'comentario requerido',
    });
  });

  createComment() {
    if (!this.commentForm().valid()) {
      this.commentForm().markAsTouched();
    } else {
      this.store.createComment(this.commentForm.body().value());
    }
  }
}
