import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import Company from 'src/app/core/interfaces/company';
import { CompanyService } from 'src/app/core/services/company/company.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  searchValue: string = '';
  faSearch = faSearch;
  companies: Company[] = [];

  constructor(
    private readonly translateService: TranslateService,
    private readonly companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((result: any) => {
      this.companies = result?.data as Company[];
    });
  }

  public get searchPlaceholder(): string {
    return this.translateService.instant('home.searchPlaceholder');
  }
}
