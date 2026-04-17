import { Routes } from '@angular/router';
import { Layout } from '../app/layout/layout';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'login',
        canActivate: [noAuthGuard],
        loadComponent: () => import('./features/auth/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'posts',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/posts/pages/list-post/posts').then((m) => m.Posts),
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./features/posts/pages/create-post/create-post').then(
                (m) => m.CreatePostPageComponent,
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./features/posts/pages/detail-post/detail-post').then((m) => m.DetailPost),
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import('./features/posts/pages/edit-post/edit-post').then((m) => m.EditPost),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'posts',
  },
];
