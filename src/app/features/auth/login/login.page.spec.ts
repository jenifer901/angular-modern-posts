import { render, screen, fireEvent } from '@testing-library/angular';
import { describe, it, expect, vi } from 'vitest';
import { LoginPage } from './login.page';
import { AuthStore } from './store/login.store';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginPage', () => {
  const setup = async (isAuthenticated = false) => {
    const routerMock = {
      navigate: vi.fn(),
    };

    const authStoreMock = {
      login: vi.fn(),
      isAuthenticated: () => isAuthenticated,
      error: () => null,
      loading: () => false,
      userId: () => null,
    };

    const result = await render(LoginPage, {
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: AuthStore, useValue: authStoreMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    return {
      ...result,
      routerMock,
      authStoreMock,
    };
  };

  it('should render login form', async () => {
    await setup();

    const inputs = document.querySelectorAll('input');

    expect(inputs.length).toBe(2);
  });

  it('should call login on submit', async () => {
    const { authStoreMock } = await setup();

    const inputs = document.querySelectorAll('input');
    const nameInput = inputs[0];
    const passwordInput = inputs[1];
    const button = screen.getByRole('button');

    await fireEvent.input(nameInput, { target: { value: 'test' } });
    await fireEvent.input(passwordInput, { target: { value: '1234' } });

    await fireEvent.click(button);

    expect(authStoreMock.login).toHaveBeenCalled();
  });

  it('should redirect if already authenticated', async () => {
    const { routerMock } = await setup(true);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
