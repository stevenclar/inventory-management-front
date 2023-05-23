import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { paginationRequest } from '../../interfaces/pagination';
import { ApiConstants } from '../../constants/api.constants';
import Company from '../../interfaces/company';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../alert/alert.service';
import { ALERT_TYPE } from '../../constants/alert.constants';
import { ERROR_KEYS } from '../../constants/error.constants';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(
    private readonly http: HttpClient,
    private readonly translateService: TranslateService,
    private readonly alertService: AlertService
  ) {}

  getCompanies(paginationOptions?: paginationRequest) {
    const params = paginationOptions ? paginationOptions : {};
    return this.http
      .get(`${environment.apiUrl}${ApiConstants.COMPANIES}`, {
        params,
      })
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.INTERNAL_SERVER_ERROR);
          return throwError(() => error);
        })
      );
  }

  getCompany(companyId: string) {
    return this.http
      .get(`${environment.apiUrl}${ApiConstants.COMPANIES}/${companyId}`)
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.NOT_THE_OWNER);
          return throwError(() => error);
        })
      );
  }

  getMyCompanies(paginationOptions?: paginationRequest) {
    const params = paginationOptions ? paginationOptions : {};
    return this.http
      .get(`${environment.apiUrl}${ApiConstants.MY_COMPANIES}`, {
        params,
      })
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.INTERNAL_SERVER_ERROR);
          return throwError(() => error);
        })
      );
  }

  createCompany(company: Company) {
    return this.http
      .post(`${environment.apiUrl}${ApiConstants.COMPANIES}`, company)
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.NIT_ALREADY_EXISTS);
          return throwError(() => error);
        })
      );
  }

  updateCompany(companyId: string, company: Company) {
    return this.http
      .patch(
        `${environment.apiUrl}${ApiConstants.COMPANIES}/${companyId}`,
        company
      )
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.INTERNAL_SERVER_ERROR);
          return throwError(() => error);
        })
      );
  }

  deleteCompany(companyId: string) {
    return this.http
      .delete(`${environment.apiUrl}${ApiConstants.COMPANIES}/${companyId}`)
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.INTERNAL_SERVER_ERROR);
          return throwError(() => error);
        })
      );
  }

  downloadInventory(nit: string) {
    return this.http
      .get(`${environment.apiUrl}${ApiConstants.COMPANIES}/${nit}/download`, {
        responseType: 'blob',
      })
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.INTERNAL_SERVER_ERROR);
          return throwError(() => error);
        })
      );
  }

  sendInventoryToEmail(nit: string, email: string) {
    return this.http
      .get(
        `${environment.apiUrl}${ApiConstants.COMPANIES}/${nit}/${email}/send-to-email`
      )
      .pipe(
        catchError((error) => {
          this.handleError(error, ERROR_KEYS.INTERNAL_SERVER_ERROR);
          return throwError(() => error);
        })
      );
  }

  private handleError(error: HttpErrorResponse, messageKey: string) {
    let message = this.translateService.instant(ERROR_KEYS.INTERNAL_SERVER_ERROR);
    if (error.status === 404) {
      message = this.translateService.instant(ERROR_KEYS.NOT_THE_OWNER);
    } else if (error.status === 422) {
      message = this.translateService.instant(messageKey);
    }
    this.alertService.showToast(
      message,
      'top',
      ALERT_TYPE.ERROR
    );
  }
}
