import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '../../tokens/tokens';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = inject(LOCAL_STORAGE);

  setItem(key: string, value: string): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): string | T | null {
    try {
      const storedValue = this.storage.getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : null;
    } catch (error) {
      return null;
    }
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}