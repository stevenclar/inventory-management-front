import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyComponent } from './company.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CompanyComponent,
    CreateCompanyComponent,
    EditCompanyComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompanyComponent,
      },
    ]),
  ],
})
export class CompanyModule {}
