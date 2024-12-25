import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export const employeeGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _AuthService = inject(AuthService);
  const userToken = localStorage.getItem('userToken');
  if (userToken !== null && _AuthService.role === 'Employee') {
    return true;
  } else {
    _Router.navigate(['/dashboard']);
    return false;
  }
};
