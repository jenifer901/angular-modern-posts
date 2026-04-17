import { Component, inject, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsStore } from '../../store/posts.store';
import { CommentsListComponent } from '../../../comments/comments';
import { ModalService } from '../../../../shared/service/confirm-modal-data';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-detail-post',
  imports: [CommentsListComponent],
  templateUrl: './detail-post.html',
  standalone: true,
})
export class DetailPost {
  private route = inject(ActivatedRoute);
  private modal = inject(ModalService);
  authService = inject(AuthService);
  store = inject(PostsStore);
  router = inject(Router);
  userId = Number(this.authService.getUserId());

  showDeleteModal = signal(false);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');

      if (id) {
        this.store.loadPost(id);
      }
    });

    effect(() => {
      if (this.store.deleteSuccess()) {
        this.router.navigate(['/posts']);

        this.store.resetDeleteState();
      }
    });
   }

  openDeleteModal() {
    this.modal.open({
      title: 'Eliminar post',
      message: '¿Seguro que quieres eliminar este post? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      onConfirm: () => {
        this.confirmDelete();
      },
    });
  }

  openEditModal(){
    this.modal.open({
      title: 'Editar post',
      message: '¿Seguro que quieres editar este post?',
      confirmText: 'Editar',
      cancelText: 'Cancelar',
      confirmButtonClass: 'hover:bg-blue-700 bg-blue-300',
      onConfirm: () => {
        this.confirmEdit();
      },
    });
  }

  confirmEdit() {
    this.router.navigate(['/posts', this.store.selectedPost()?.id, 'edit']);
  }

  confirmDelete() {
    const id = this.store.selectedPost()?.id;

    if (!id) return;

    this.store.deletePost(id);
  }
}
