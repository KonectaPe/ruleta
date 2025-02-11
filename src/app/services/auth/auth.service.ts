import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router: Router = inject(Router);
  storageService: StorageService = inject(StorageService);
  token: string = 'token';

  getToken(): string | null {
    return this.storageService.getItem(this.token ?? '');
  }

  setToken(value: string): void {
    return this.storageService.setItem(this.token, value);
  }

  removeToken(): void {
    return this.storageService.removeItem(this.token);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getId(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const id = JSON.parse(atob(token.split('.')[1])).id;
        return id;
      } catch (error) {
        console.error('Ha ocurrido un error');
        this.removeToken();
        return null;
      }
    }
    return null;
  }

  getExpirationToken(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const exp = JSON.parse(atob(token.split('.')[1])).exp;
        if (!exp) {
          throw new Error('No se ha encontrado la fecha de expiración');
        }
        const currentTime = Math.floor(Date.now() / 1000);
        return exp < currentTime;
      } catch (error) {
        console.error('Ha ocurrido un error');
        this.removeToken();
        return true;
      }
    }
    return true;
  }
}