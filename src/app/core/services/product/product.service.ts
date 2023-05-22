import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { paginationRequest } from '../../interfaces/pagination';
import { ApiConstants } from '../../constants/api.constants';
import Product from '../../interfaces/product';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../alert/alert.service';
import { ALERT_TYPE } from '../../constants/alert.constants';
import { ERROR_KEYS } from '../../constants/error.constants';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private readonly http: HttpClient,
    private readonly translateService: TranslateService,
    private readonly alertService: AlertService
  ) {}

  getProducts(paginationOptions?: paginationRequest) {
    const params = paginationOptions ? paginationOptions : {};
    return this.http
      .get(`${environment.apiUrl}${ApiConstants.PRODUCTS}`, {
        params,
      })
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.INTERNAL_SERVER_ERROR);
          return throwError(() => error);
        })
      );
  }

  getMyProducts(paginationOptions?: paginationRequest) {
    const params = paginationOptions ? paginationOptions : {};
    return this.http
      .get(`${environment.apiUrl}${ApiConstants.MY_PRODUCTS}`, {
        params,
      })
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.INTERNAL_SERVER_ERROR);
          return throwError(() => error);
        })
      );
  }

  createProduct(product: Product) {
    return this.http
      .post(`${environment.apiUrl}${ApiConstants.PRODUCTS}`, product)
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.NIT_ALREADY_EXISTS);
          return throwError(() => error);
        })
      );
  }

  updateProduct(productId: number, product: Product) {
    return this.http
      .patch(
        `${environment.apiUrl}${ApiConstants.PRODUCTS}/${productId}`,
        product
      )
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.INTERNAL_SERVER_ERROR);
          return throwError(() => error);
        })
      );
  }

  deleteProduct(productId: number) {
    return this.http
      .delete(`${environment.apiUrl}${ApiConstants.PRODUCTS}/${productId}`)
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.INTERNAL_SERVER_ERROR);
          return throwError(() => error);
        })
      );
  }

  private handleError(error: HttpErrorResponse, messageKey: string) {
    if (error.status === 422) {
      this.translateService.get(messageKey).subscribe((message) => {
        this.alertService.showToast(message, 'top', ALERT_TYPE.ERROR);
      });
    } else {
      console.error(error);
      this.alertService.showToast(
        this.translateService.instant(ERROR_KEYS.INTERNAL_SERVER_ERROR),
        'top',
        ALERT_TYPE.ERROR
      );
    }
  }
}
