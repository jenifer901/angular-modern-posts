import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from './auth.types';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // ajusta al backend mock que monte con json-server
  private readonly baseUrl = 'http://localhost:3000';

  private router = inject(Router);
  private http = inject(HttpClient);

  login(name: string, password: string): Observable<LoginResponse> {
    // json-server no hace auth real: lo simulamos consultando users
    return new Observable((observer) => {
      this.http
        .get<{ id: number; name: string; password: string }[]>(`${this.baseUrl}/users`)
        .subscribe({
          next: (users) => {
            const u = users.find((x) => x.name === name && x.password === password);
            if (!u) {
              observer.error({ status: 401 });
              return;
            }

            const token = 'STATIC_MOCK_TOKEN';
            // persistimos token (luego interceptor)
            localStorage.setItem('token', token);
            localStorage.setItem('userId', String(u.id));
            localStorage.setItem('userName', u.name);

            observer.next({ token, userId: u.id, name: u.name });
            observer.complete();
          },
          error: (e) => observer.error(e),
        });
    });
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
