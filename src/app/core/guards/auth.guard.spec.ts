import { describe, it, expect, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth.guard';
import { Router } from '@angular/router';
import { AuthStore } from '../../features/auth/login/store/login.store';

describe('authGuard', () => {
  it('should allow access if authenticated', () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthStore,
          useValue: {
            isAuthenticated: () => true,
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: vi.fn(),
          },
        },
      ],
    });

    const result = TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));

    expect(result).toBe(true);
  });

  it('should block and redirect if NOT authenticated', () => {
    const navigateMock = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthStore,
          useValue: {
            isAuthenticated: () => false,
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: navigateMock,
          },
        },
      ],
    });

    const result = TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));

    expect(result).toBe(false);
    expect(navigateMock).toHaveBeenCalledWith(['/login']);
  });
});
