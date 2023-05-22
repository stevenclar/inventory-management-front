import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage/storage.service';
import { KeysConstants } from '../constants/keys.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = this.getJwt();

    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.clearJwt();
        }
        return throwError(error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private getJwt() {
    return this.storageService.getItem(KeysConstants.JWT);
  }

  private clearJwt() {
    return this.storageService.removeItem(KeysConstants.JWT);
  }
}
