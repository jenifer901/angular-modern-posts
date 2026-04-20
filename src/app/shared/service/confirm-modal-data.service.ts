import { Injectable, signal } from '@angular/core';
import { ConfirmModalData } from '../models/confirm-modal-data.models';

@Injectable({ providedIn: 'root' })
export class ModalService {
  modalData = signal<ConfirmModalData | null>(null);

  open(data: ConfirmModalData) {
    this.modalData.set(data);
  }

  close() {
    this.modalData.set(null);
  }
}
