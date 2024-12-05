import { CanActivateFn } from '@angular/router';
import { AppwriteService } from './services/appwrite.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = async (route, state) => {
  const isLoggedIn = await inject(AppwriteService).isLoggedIn();
  return isLoggedIn;
};
