import { Component, input, inject } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { TimeagoModule } from 'ngx-timeago';
import { ModalService } from '../../../../shared/service/confirm-modal-data.service';
import { CommentsStore } from '../../store/comments.store';
import { I18N_IMPORTS } from '../../../../shared/shared-imports';

@Component({
  selector: 'app-detail-comment',
  imports: [TimeagoModule, I18N_IMPORTS],
  templateUrl: './detail-comment.html',
})
export class DetailComment {
  private modal = inject(ModalService);
  store = inject(CommentsStore);

  comment = input.required<Comment>();

  userId = input.required<string | null>();

  openDeleteModal() {
    this.modal.open({
      title: 'COMMENTS.DELETE',
      message: 'MODAL.CONFIRM_DELETE_BODY',
      confirmText: 'BUTTON.DELETE',
      cancelText: 'BUTTON.CANCEL',
      onConfirm: () => {
        this.confirmDelete();
      },
    });
  }

  confirmDelete() {
    this.store.deleteComment(this.comment());
  }

  openEditModal() {
    this.modal.open({
      title: 'COMMENTS.EDIT',
      message: 'MODAL.CONFIRM_EDIT_BODY',
      confirmText: 'BUTTON.EDIT',
      confirmButtonClass: 'hover:bg-blue-700 bg-blue-300',
      cancelText: 'BUTTON.CANCEL',
      onConfirm: () => {
        this.confirmEdit();
      },
    });
  }

  confirmEdit() {
    this.store.startEdit(this.comment());
  }

  saveEdit(id: string) {
    const body = this.store.editText();

    this.store.updateComment(id, body);

    this.store.editingCommentId.set(null);
  }
}
