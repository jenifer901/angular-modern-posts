import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { AuthStore } from './store/login.store';
import { Router } from '@angular/router';
import { I18N_IMPORTS } from '../../../shared/shared-imports';

@Component({
  standalone: true,
  imports: [FormField, I18N_IMPORTS],
  templateUrl: './login.page.html',
})
export class LoginPage {
  authStore = inject(AuthStore);
  router = inject(Router);

  loginModel = signal({
    name: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schema) => {
    required(schema.name);
    required(schema.password);
  });

  constructor() {
    if (this.authStore.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  submit() {
    if (!this.loginForm().valid()) return;

    this.authStore.login(this.loginModel());
  }
}
