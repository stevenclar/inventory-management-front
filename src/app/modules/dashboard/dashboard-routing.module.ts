import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'companies',
        loadChildren: () =>
          import('src/app/modules/company/company.module').then(
            (m) => m.CompanyModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('src/app/modules/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('src/app/modules/inventory/inventory.module').then(
            (m) => m.InventoryModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DashboardRoutingModule {}
