import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('authenticate')) {
    console.log('JWT Interceptor is running for request:', req.url);
    const authService = inject(AuthService);
    const token = authService.getToken();

    if (token) {
      console.log('Token found:', token);
      console.log('Attaching to headers.');
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      console.log('No token found in local storage.');
    }
  }

  return next(req);
};
