import { Routes } from '@angular/router';
import { Layout } from '../app/layout/layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'posts',
        canActivate: [authGuard],
        loadComponent: () => import('./features/posts/pages/list-post/posts').then((m) => m.Posts),
      },
      {
        path: 'posts/new',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/posts/pages/create-post/create-post').then(
            (m) => m.CreatePostPageComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
