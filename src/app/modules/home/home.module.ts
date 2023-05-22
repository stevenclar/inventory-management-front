import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyCardComponent } from './components/company-card/company-card.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [HomeComponent, CompanyCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
})
export class HomeModule {}
