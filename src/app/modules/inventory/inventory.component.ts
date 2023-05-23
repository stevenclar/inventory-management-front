import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { InventoryService } from 'src/app/core/services/inventory/inventory.service';
import Inventory from 'src/app/core/interfaces/inventory';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { CreateInventoryComponent } from './components/create-inventory/create-inventory.component';
import { EditInventoryComponent } from './components/edit-inventory/edit-inventory.component';
import { map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/core/services/company/company.service';
import Company from 'src/app/core/interfaces/company';

const LIMIT = 5;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {
  faEdit = faEdit;
  faRemove = faTrash;

  companyNit: string = '';

  company: Company | null = null;

  inventories: Inventory[] = [];

  currentPage: number = 1;
  hasNextPage: boolean = false;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly inventoryService: InventoryService,
    private readonly companyService: CompanyService,
    private readonly alertService: AlertService,
    private readonly translateService: TranslateService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(map((params) => params.get('id')))
      .subscribe((id) => {
        this.companyNit = id ?? '';
        this.getInventories();
      });
  }

  get disablePreviousPage() {
    return this.currentPage <= 1;
  }

  nextPage() {
    this.currentPage++;
    this.getInventories();
  }

  previousPage() {
    this.currentPage--;
    this.getInventories();
  }

  getInventories() {
    this.companyService.getCompany(this.companyNit).subscribe((response) => {
      this.company = response as Company;
    });
  }

  openCreateInventoryDialog() {
    const dialog = this.matDialog.open(CreateInventoryComponent, {
      data: this.companyNit,
    });
    dialog.afterClosed().subscribe((response) => {
      if (response) {
        this.getInventories();
      }
    });
  }

  openEditInventoryDialog(inventory: Inventory) {
    const dialog = this.matDialog.open(EditInventoryComponent, {
      data: inventory,
    });
    dialog.afterClosed().subscribe((response) => {
      if (response) {
        this.getInventories();
      }
    });
  }

  deleteInventory(inventoryId: number) {
    this.alertService
      .showConfirmation(
        this.translateService.instant('inventory.delete.title'),
        this.translateService.instant('inventory.delete.message')
      )
      .then((response) => {
        if (response) {
          this.inventoryService.deleteInventory(inventoryId).subscribe(() => {
            this.alertService.showToast('Compañía eliminada correctamente');
            this.getInventories();
          });
        }
      });
  }

  downloadInventories() {
    this.companyService
      .downloadInventory(this.companyNit)
      .subscribe((response) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'inventories.pdf';
        a.click();
      });
  }
}
