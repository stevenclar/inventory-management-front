import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setItem(key: string, value: string): void {
    const encryptedValue = this.encrypt(value);
    localStorage.setItem(key, encryptedValue);
  }

  getItem(key: string): string | null {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      const decryptedValue = this.decrypt(encryptedValue);
      return decryptedValue;
    }
    return null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  private encrypt(value: any): string {
    const encryptedValue = CryptoJS.AES.encrypt(value, environment.secret).toString();
    return encryptedValue;
  }

  private decrypt(encryptedValue: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, environment.secret);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedValue;
  }
}
