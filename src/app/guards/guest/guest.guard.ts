import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { isPlatformServer } from '@angular/common';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  if (isPlatformServer(platformId)) {
    return false;
  }
  if (!authService.isAuthenticated()) {
    return true;
  }
  router.navigateByUrl('dashboard');
  return false;
};