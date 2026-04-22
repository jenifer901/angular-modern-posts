import { Injectable, signal, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { LoginUser } from '../models/login-user';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private authService = inject(AuthService);
  private router = inject(Router);

  // state
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  // selectors
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();

  isAuthenticated = computed(() => {
    return !!this.userId();
  });

  userId = this.authService.userId;

  login(data: LoginUser) {
    this._loading.set(true);
    this._error.set(null);

    this.authService.login(data.name, data.password).subscribe({
      next: () => {
        this._loading.set(false);
        this.router.navigate(['/posts']);
      },
      error: () => {
        this._loading.set(false);
        this._error.set('Invalid credentials');
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}
