import { Component, input, inject } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { TimeagoModule } from 'ngx-timeago';
import { AuthService } from '../../../../core/auth/auth.service';
import { ModalService } from '../../../../shared/service/confirm-modal-data';
import { CommentsStore } from '../../store/comments.store';

@Component({
  selector: 'app-detail-comment',
  imports: [TimeagoModule],
  templateUrl: './detail-comment.html',
})
export class DetailComment {
  private modal = inject(ModalService);
  private authService = inject(AuthService);
  store = inject(CommentsStore);

  comment = input.required<Comment>();
  userId = Number(this.authService.getUserId());

  openDeleteModal() {
    this.modal.open({
      title: 'Eliminar comentario',
      message: '¿Seguro que quieres eliminar este comentario? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
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
      title: 'Editar comentario',
      message: '¿Seguro que quieres editar este comentario?',
      confirmText: 'Editar',
      confirmButtonClass: 'hover:bg-blue-700 bg-blue-300',
      cancelText: 'Cancelar',
      onConfirm: () => {
        this.confirmEdit();
      },
    });
  }

  confirmEdit() {
    console.log('dentro del editar');
    this.store.startEdit(this.comment());
  }

  saveEdit(id: number) {
    const body = this.store.editText();

    this.store.updateComment(id, body);

    this.store.editingCommentId.set(null);
  }
}
