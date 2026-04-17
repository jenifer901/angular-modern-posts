import { Component, signal, computed, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { AuthStore } from '../../features/auth/login/store/login.store';
import { SearchPost } from '../../features/posts/components/search-post/search-post'
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

type Lang = 'es' | 'en';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [NgClass, SearchPost],
  templateUrl: './header.html',
})
export class AppHeaderComponent {
  router = inject(Router);
  authStore = inject(AuthStore);

  private lang = signal<Lang>('es');
  techpoc = 'TechPoC';

  // mostrar buscador solo en pantalla posts
 url = toSignal(
  this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    map(() => this.router.url)
  ),
  { initialValue: this.router.url }
);

showSearch = computed(() => this.url() === '/posts');

  logout() {
    this.authStore.logout();
  }

  isActive(next: Lang) {
    return this.lang() === next;
  }
}
