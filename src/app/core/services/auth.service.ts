import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'isLoggedIn';
  isLoggedIn: boolean = false;

  constructor() {
    this.isLoggedIn = this.checkAuthStatus();
  }

  login() {
    this.isLoggedIn = true;
    this.setAuthStatus(true);
  }

  logout() {
    this.isLoggedIn = false;
    this.setAuthStatus(false);
  }

  private checkAuthStatus(): boolean {
    const authStatus = localStorage.getItem(this.AUTH_KEY);
    return authStatus ? JSON.parse(authStatus) : false;
  }

  private setAuthStatus(status: boolean): void {
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(status));
  }
}
