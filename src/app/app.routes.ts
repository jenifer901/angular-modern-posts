import { Routes } from '@angular/router';
import { Layout } from '../app/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.page').then((m) => m.LoginPage),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
