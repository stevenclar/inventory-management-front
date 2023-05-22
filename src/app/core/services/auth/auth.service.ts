import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiConstants } from '../../constants/api.constants';
import { StorageService } from '../storage/storage.service';
import { KeysConstants } from '../../constants/keys.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly storageService: StorageService
  ) {}

  login(email: string, password: string, rememberMe: boolean) {
    return this.httpClient
      .post(`${environment.apiUrl}${ApiConstants.LOGIN}`, { email, password })
      .pipe(
        map((response: any) => {
          if (rememberMe) {
            this.storageService.setItem(KeysConstants.EMAIL, email);
            this.storageService.setItem(KeysConstants.PASSWORD, password);
          }
          this.storageService.setItem(KeysConstants.JWT, response.token);
          this.isLoggedIn = true;
          return response;
        })
      );
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    return this.httpClient
      .post(`${environment.apiUrl}${ApiConstants.SIGNUP}`, {
        firstName,
        lastName,
        email,
        password,
      })
      .pipe(
        map((response: any) => {
          this.storageService.setItem(KeysConstants.JWT, response.token);
          this.isLoggedIn = true;
          return response;
        })
      );
  }

  logout() {
    this.storageService.removeItem(KeysConstants.JWT);
    this.isLoggedIn = false;
  }

  getRememberedCredentials() {
    const email = this.storageService.getItem(KeysConstants.EMAIL);
    const password = this.storageService.getItem(KeysConstants.PASSWORD);
    return { email, password };
  }

  getJwt() {
    return this.storageService.getItem(KeysConstants.JWT);
  }

  checkAuthStatus(): void {
    this.httpClient
      .get(`${environment.apiUrl}${ApiConstants.ME}`)
      .subscribe(() => {
        this.isLoggedIn = true;
      });
  }
}
