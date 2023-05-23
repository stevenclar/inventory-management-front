import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { InventoryComponent } from './inventory.component';
import { CreateInventoryComponent } from './components/create-inventory/create-inventory.component';
import { EditInventoryComponent } from './components/edit-inventory/edit-inventory.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    InventoryComponent,
    CreateInventoryComponent,
    EditInventoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: InventoryComponent,
      },
    ]),
  ],
})
export class InventoryModule {}
