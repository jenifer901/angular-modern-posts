import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmModal } from './shared/confirm-modal/confirm-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConfirmModal],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-posts-app');
}
