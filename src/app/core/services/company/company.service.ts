import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { paginationRequest } from '../../interfaces/pagination';
import { ApiConstants } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private readonly http: HttpClient) {}

  getCompanies(paginationOptions?: paginationRequest) {
    const params = paginationOptions ? paginationOptions : {};
    return this.http.get(`${environment.apiUrl}${ApiConstants.COMPANIES}`, {
      params,
    });
  }

  getMyCompanies(paginationOptions?: paginationRequest) {
    const params = paginationOptions ? paginationOptions : {};
    return this.http.get(`${environment.apiUrl}${ApiConstants.MY_COMPANIES}`, {
      params,
    });
  }
  
}
