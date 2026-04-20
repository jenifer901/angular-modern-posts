import { Component, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { PostFormComponent } from '../../components/post-form/post-form';
import { Post } from '../../models/posts.model';
import { PostSelectStore } from '../../store/select-post.store';
import { I18N_IMPORTS } from '../../../../shared/shared-imports';
import { ModalService } from '../../../../shared/service/confirm-modal-data.service';

@Component({
  selector: 'app-edit-post',
  imports: [PostFormComponent, I18N_IMPORTS],
  templateUrl: './edit-post.html',
})
export class EditPost {
  storePost = inject(PostSelectStore);
  private router = inject(Router);
  private modal = inject(ModalService);

  loading = this.storePost.loading;

  postId = this.storePost.post()?.id;

  constructor() {
    effect(() => {
      if (this.storePost.updateSuccess()) {
        this.goBack();

        this.storePost.resetUpdateState();
      }
    });
  }

  updatePost(post: Post) {
    this.modal.open({
      title: 'MODAL.POST_EDIT',
      message: 'MODAL.CONFIRM_EDIT_BODY',
      confirmText: 'BUTTON.EDIT',
      cancelText: 'BUTTON.CANCEL',
      confirmButtonClass: 'hover:bg-blue-700 bg-blue-300',
      onConfirm: () => {
        this.confirmEdit(post);
      },
    });
  }

  confirmEdit(post: Post) {
    this.storePost.updatePost(post);
  }

  goBack() {
    this.router.navigate([`/posts/${this.postId}`]);
  }
}
