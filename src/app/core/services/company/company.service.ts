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
