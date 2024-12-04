import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/authService';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const roles = route.data['roles'] as string[];
  const userRole = authService.getUserRole();

  if (roles && userRole && roles.includes(userRole)) {
    return true;
  }
  router.navigate(['/permission-denied']);
  return false;
};
