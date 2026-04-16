import { Component, inject, Input } from '@angular/core';
import { ModalService } from '../service/confirm-modal-data';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  imports: [NgClass],
  templateUrl: './confirm-modal.html',
  standalone: true,
})
export class ConfirmModal {
  modal = inject(ModalService);

  @Input() confirmButtonClass = 'bg-red-300 hover:bg-red-600 text-white';

  confirm() {
    const data = this.modal.modalData();

    if (data?.onConfirm) {
      data.onConfirm();
    }

    this.modal.close();
  }
}
