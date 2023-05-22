import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import Company from 'src/app/core/interfaces/company';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  searchValue: string = '';
  faSearch = faSearch;
  companies: Company[] = [
    {
      nit: '1',
      name: 'Company 1',
      description: 'Aliquip sunt nostrud nostrud sit aute eiusmod ad. 1',
      address: 'Address 1',
      phone: 'Phone 1',
    },
    {
      nit: '2',
      name: 'Company 2',
      description: 'Dolor duis eu minim ad sint proident quis occaecat est. 2',
      address: 'Address 2',
      phone: 'Phone 2',
    },
    {
      nit: '3',
      name: 'Company 3',
      description: 'Ad ullamco sint do esse ea anim do. 3',
      address: 'Address 3',
      phone: 'Phone 3',
    },
    {
      nit: '4',
      name: 'Company 4',
      description:
        'Dolor amet anim voluptate quis amet in fugiat sunt enim qui dolore dolore ea do. 4',
      address: 'Address 4',
      phone: 'Phone 4',
    },
    {
      nit: '5',
      name: 'Company 5',
      description:
        'Quis magna aliquip esse esse ad elit anim magna velit laboris sunt. 5',
      address: 'Address 5',
      phone: 'Phone 5',
    },
  ];

  constructor(private readonly translateService: TranslateService) {}

  public get searchPlaceholder(): string {
    return this.translateService.instant('home.searchPlaceholder');
  }
}
