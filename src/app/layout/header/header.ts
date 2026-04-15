import { Component, computed, signal, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { AuthStore } from '../../features/auth/login/store/login.store';

type Lang = 'es' | 'en';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.html',
})
export class AppHeaderComponent {
  router = inject(Router);
  authStore = inject(AuthStore);

  private lang = signal<Lang>('es');
  techpoc = 'TechPoC';

  // mostrar buscador solo en pantalla posts
  showSearch = computed(() => this.router.url.startsWith('/posts'));

  logout() {
    this.authStore.logout();
  }

  isActive(next: Lang) {
    return this.lang() === next;
  }
}
