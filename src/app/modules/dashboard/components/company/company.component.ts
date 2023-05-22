import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CreateCompanyComponent } from '../create-company/create-company.component';
import { CompanyService } from 'src/app/core/services/company/company.service';
import Company from 'src/app/core/interfaces/company';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { EditCompanyComponent } from '../edit-company/edit-company.component';

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
    private readonly companyService: CompanyService,
    private readonly alertService: AlertService,
    private readonly translateService: TranslateService
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
        console.log('hasNextPage', this.hasNextPage);
        console.log('disablePreviousPage', this.disablePreviousPage);
      });
  }

  openCreateCompanyDialog() {
    const dialog = this.matDialog.open(CreateCompanyComponent);
    dialog.afterClosed().subscribe((response) => {
      if (response) {
        this.getCompanies();
      }
    });
  }

  openEditCompanyDialog(company: Company) {
    const dialog = this.matDialog.open(EditCompanyComponent, {
      data: company,
    });
    dialog.afterClosed().subscribe((response) => {
      if (response) {
        this.getCompanies();
      }
    });
  }

  deleteCompany(companyId: string) {
    this.alertService
      .showConfirmation(
        this.translateService.instant('company.delete.title'),
        this.translateService.instant('company.delete.message')
      )
      .then((response) => {
        if (response) {
          this.companyService.deleteCompany(companyId).subscribe(() => {
            this.alertService.showToast('Compañía eliminada correctamente');
            this.getCompanies();
          });
        }
      });
  }
}
