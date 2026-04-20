import { Injectable, signal, inject, effect, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { LoginUser, User } from '../models/login-user';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private authService = inject(AuthService);
  private router = inject(Router);

  // state
  private _currentUser = signal<User | null>(this.getUserFromStorage());
  private _loading = signal(false);
  private _error = signal<string | null>(null);
  private _loginPayload = signal<LoginUser | null>(null);

  // selectors
  currentUser = this._currentUser.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();

  isAuthenticated = computed(() => {
    return !!localStorage.getItem('token');
  });

  userId = computed(() => this.authService.getUserId());

  constructor() {
    effect(() => {
      const credentials = this._loginPayload();
      if (!credentials) return;

      this._loading.set(true);
      this._error.set(null);

      this.authService.login(credentials.name, credentials.password).subscribe({
        next: () => {
          this._loading.set(false);

          this.router.navigate(['/posts']);
        },

        error: () => {
          this._loading.set(false);
          this._error.set('Invalid credentials');
        },
      });
    });
  }

  login(data: LoginUser) {
    this._loginPayload.set(data);
  }

  private getUserFromStorage(): User | null {
    const stored = localStorage.getItem('user');

    return stored ? JSON.parse(stored) : null;
  }

  logout() {
    this.authService.logout();
  }
}
