import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CompanyComponent } from './components/company/company.component';

@NgModule({
  declarations: [SidebarComponent, DashboardComponent, CompanyComponent],
  imports: [DashboardRoutingModule, CommonModule, SharedModule],
})
export class DashboardModule {}
