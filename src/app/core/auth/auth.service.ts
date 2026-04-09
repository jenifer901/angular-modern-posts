import { Injectable, computed, inject, signal } from '@angular/core';
import { User, UserRoles } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSignal = signal<User>({} as User);

  user = computed(() => this.userSignal());

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth');
  }

  private api = inject(ApiService);
  private router = inject(Router);

  saveSession(data: any) {
    localStorage.setItem('auth', JSON.stringify(data));
  }

  login(email: string, password: string) {
    return this.api.post('user/login', { email, password });
  }

  logout() {
    localStorage.removeItem('auth');
    this.router.navigate(['login']);
    this.userSignal.set({} as User);
  }
}
