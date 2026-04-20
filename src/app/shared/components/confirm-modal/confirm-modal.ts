import { Component, inject } from '@angular/core';
import { ModalService } from '../../service/confirm-modal-data.service';
import { NgClass } from '@angular/common';
import { I18N_IMPORTS } from '../../shared-imports';

@Component({
  selector: 'app-confirm-modal',
  imports: [NgClass, I18N_IMPORTS],
  templateUrl: './confirm-modal.html',
  standalone: true,
})
export class ConfirmModal {
  modal = inject(ModalService);

  confirm() {
    const data = this.modal.modalData();

    if (data?.onConfirm) {
      data.onConfirm();
    }

    this.modal.close();
  }
}
