import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiConstants } from '../../constants/api.constants';
import { StorageService } from '../storage/storage.service';
import { KeysConstants } from '../../constants/keys.constants';
import { ERROR_KEYS } from '../../constants/error.constants';
import { ALERT_TYPE } from '../../constants/alert.constants';
import { AlertService } from '../alert/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly storageService: StorageService,
    private readonly alertService: AlertService,
    private readonly translateService: TranslateService
  ) {
    this.checkSyncAuthStatus();
  }

  login(email: string, password: string, rememberMe: boolean) {
    return this.httpClient
      .post(`${environment.apiUrl}${ApiConstants.LOGIN}`, { email, password })
      .pipe(
        map((response: any) => {
          if (rememberMe) {
            this.storageService.setItem(KeysConstants.EMAIL, email);
            this.storageService.setItem(KeysConstants.PASSWORD, password);
          } else {
            this.storageService.removeItem(KeysConstants.EMAIL);
            this.storageService.removeItem(KeysConstants.PASSWORD);
          }
          this.storageService.setItem(KeysConstants.JWT, response.token);
          this.isLoggedIn = true;
          return response;
        })
      )
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.INVALID_CREDENTIALS);
          return throwError(() => error);
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
      )
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.EMAIL_ALREADY_EXISTS);
          return throwError(() => error);
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

  checkAuthStatus(): void {
    this.httpClient
      .get(`${environment.apiUrl}${ApiConstants.ME}`)
      .subscribe(() => {
        this.isLoggedIn = true;
      });
  }

  checkSyncAuthStatus(): void {
    this.isLoggedIn = !!this.storageService.getItem(KeysConstants.JWT);
  }

  private handleError(error: HttpErrorResponse, messageKey: string) {
    if (error.status === 422) {
      this.translateService.get(messageKey).subscribe((message) => {
        this.alertService.showToast(message, 'top', ALERT_TYPE.ERROR);
      });
    } else {
      this.alertService.showToast(
        this.translateService.instant(ERROR_KEYS.INTERNAL_SERVER_ERROR),
        'top',
        ALERT_TYPE.ERROR
      );
    }
  }
}
