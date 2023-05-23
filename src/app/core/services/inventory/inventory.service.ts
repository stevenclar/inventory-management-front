import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { paginationRequest } from '../../interfaces/pagination';
import { ApiConstants } from '../../constants/api.constants';
import Inventory from '../../interfaces/inventory';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../alert/alert.service';
import { ALERT_TYPE } from '../../constants/alert.constants';
import { ERROR_KEYS } from '../../constants/error.constants';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(
    private readonly http: HttpClient,
    private readonly translateService: TranslateService,
    private readonly alertService: AlertService
  ) {}

  getInventories(paginationOptions?: paginationRequest) {
    const params = paginationOptions ? paginationOptions : {};
    return this.http
      .get(`${environment.apiUrl}${ApiConstants.INVENTORIES}`, {
        params,
      })
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.INTERNAL_SERVER_ERROR);
          return throwError(() => error);
        })
      );
  }

  getMyInventories(paginationOptions?: paginationRequest) {
    const params = paginationOptions ? paginationOptions : {};
    return this.http
      .get(`${environment.apiUrl}${ApiConstants.MY_INVENTORIES}`, {
        params,
      })
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.INTERNAL_SERVER_ERROR);
          return throwError(() => error);
        })
      );
  }

  createInventory(inventory: Inventory) {
    return this.http
      .post(`${environment.apiUrl}${ApiConstants.INVENTORIES}`, inventory)
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.NIT_ALREADY_EXISTS);
          return throwError(() => error);
        })
      );
  }

  updateInventory(inventoryId: number, inventory: Inventory) {
    return this.http
      .patch(
        `${environment.apiUrl}${ApiConstants.INVENTORIES}/${inventoryId}`,
        inventory
      )
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.INTERNAL_SERVER_ERROR);
          return throwError(() => error);
        })
      );
  }

  deleteInventory(inventoryId: number) {
    return this.http
      .delete(`${environment.apiUrl}${ApiConstants.INVENTORIES}/${inventoryId}`)
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
