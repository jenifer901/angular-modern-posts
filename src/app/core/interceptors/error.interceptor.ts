import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      console.log('HTTP Error:', err);

      if (err.status === 401) {
        localStorage.removeItem('auth');
        location.href = '/login';
      }

      return throwError(() => err);
    }),
  );
};
