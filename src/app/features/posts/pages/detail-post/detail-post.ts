import { Component, inject, effect, signal } from '@angular/core';
import { CommentsListComponent } from '../../../comments/comments';
import { ModalService } from '../../../../shared/service/confirm-modal-data.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { I18N_IMPORTS } from '../../../../shared/shared-imports';
import { PostSelectStore } from '../../store/select-post.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-post',
  imports: [CommentsListComponent, I18N_IMPORTS],
  templateUrl: './detail-post.html',
  standalone: true,
})
export class DetailPost {
  private modal = inject(ModalService);
  authService = inject(AuthService);
  store = inject(PostSelectStore);
  router = inject(Router);

  userId = Number(this.authService.getUserId());

  post = this.store.post;
  loading = this.store.loading;
  error = this.store.error;
  isOwner = this.store.isOwner;

  showDeleteModal = signal(false);

  constructor() {
    console.log(this.isOwner())
    effect(() => {
      if (this.store.deleteSuccess()) {
        this.router.navigate(['/posts']);

        this.store.resetDeleteState();
      }
    });
  }

  openDeleteModal() {
    this.modal.open({
      title: 'MODAL.POST_DELETE',
      message: 'MODAL.CONFIRM_DELETE_BODY',
      confirmText: 'BUTTON.DELETE',
      cancelText: 'BUTTON.CANCEL',
      onConfirm: () => {
        this.confirmDelete();
      },
    });
  }

  openEditModal() {
    this.modal.open({
      title: 'MODAL.POST_EDIT',
      message: 'MODAL.CONFIRM_EDIT_BODY',
      confirmText: 'BUTTON.EDIT',
      cancelText: 'BUTTON.CANCEL',
      confirmButtonClass: 'hover:bg-blue-700 bg-blue-300',
      onConfirm: () => {
        this.confirmEdit();
      },
    });
  }

  confirmEdit() {
    this.router.navigate(['/posts', this.post()?.id, 'edit']);
  }

  confirmDelete() {
    const id = this.post()?.id;

    if (!id) return;

    this.store.deletePost(id);
  }
}
