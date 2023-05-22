import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CompanyService } from 'src/app/core/services/company/company.service';
import Company from 'src/app/core/interfaces/company';

const LIMIT = 5;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit {
  faEdit = faEdit;
  faRemove = faTrash;

  companies: Company[] = [];

  currentPage: number = 1;
  hasNextPage: boolean = false;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly companyService: CompanyService
  ) {}

  ngOnInit() {
    this.getCompanies();
  }

  get disablePreviousPage() {
    return this.currentPage <= 1;
  }

  nextPage() {
    this.currentPage++;
    this.getCompanies();
  }

  previousPage() {
    this.currentPage--;
    this.getCompanies();
  }

  getCompanies() {
    this.companyService
      .getMyCompanies({ limit: LIMIT, page: this.currentPage })
      .subscribe((response: any) => {
        this.companies = response.data;
        this.hasNextPage = response.hasNextPage;
      });
  }

  openCreateCompanyDialog() {
    // this.matDialog.open(CreateCompanyComponent);
  }
}
