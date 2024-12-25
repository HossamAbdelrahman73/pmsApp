import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginUserGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);

  if (!localStorage.getItem('userToken')) {
    return true;
  } else {
    router.navigate(['/dashboard/manager/home']);
    return false;
  }
};
