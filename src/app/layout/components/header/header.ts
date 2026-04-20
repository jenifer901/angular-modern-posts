import { Component, computed, inject } from '@angular/core';
import { AuthStore } from '../../../features/auth/login/store/login.store';
import { SearchPost } from '../../../features/posts/components/search-post/search-post';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { I18N_IMPORTS } from '../../../shared/shared-imports';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [SearchPost, LanguageSwitcher, I18N_IMPORTS],
  templateUrl: './header.html',
})
export class AppHeaderComponent {
  router = inject(Router);
  authStore = inject(AuthStore);

  techpoc = 'TechPoC';

  // mostrar buscador solo en pantalla posts
  url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  showSearch = computed(() => this.url() === '/posts');

  logout() {
    this.authStore.logout();
  }
}
