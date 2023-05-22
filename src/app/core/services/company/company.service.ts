import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { paginationRequest } from '../../interfaces/pagination';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private readonly http: HttpClient) {
    console.log(environment.apiUrl);
  }

  getCompanies(paginationOptions?: paginationRequest) {
    const params = paginationOptions ? paginationOptions : {};
    return this.http.get(`${environment.apiUrl}/companies`, { params  });
  }
}
