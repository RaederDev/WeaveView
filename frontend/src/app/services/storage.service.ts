import { Injectable } from '@angular/core';
import { StorageKey } from '../enums/storage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public setItem(key: StorageKey, value: unknown): void {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  public getItem<T>(key: StorageKey): T | null {
    const stringValue = localStorage.getItem(key);
    if (stringValue === null) {
      return null;
    }
    return JSON.parse(stringValue);
  }
}
