import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const session = localStorage.getItem('auth');

  if (!session) return next(req);

  const { accessToken } = JSON.parse(session);

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return next(cloned);
};
