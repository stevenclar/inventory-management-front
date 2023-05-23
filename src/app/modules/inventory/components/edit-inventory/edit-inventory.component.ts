import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import Inventory from 'src/app/core/interfaces/inventory';
import Product from 'src/app/core/interfaces/product';
import { SelectOption } from 'src/app/core/interfaces/select';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { InventoryService } from 'src/app/core/services/inventory/inventory.service';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
})
export class EditInventoryComponent {
  inventoryForm: FormGroup;

  availableQuantity: FormControl;
  description: FormControl;
  product: FormControl;

  productOptions: SelectOption[] = [];

  alreadySubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditInventoryComponent>,
    @Inject(MAT_DIALOG_DATA) public inventory: Inventory,
    private readonly inventoryService: InventoryService,
    private readonly alertService: AlertService,
    private readonly translateService: TranslateService,
    private readonly productService: ProductService
  ) {
    this.availableQuantity = new FormControl(this.inventory.availableQuantity, [
      Validators.required,
      Validators.min(0),
    ]);
    this.description = new FormControl(this.inventory.description, [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.product = new FormControl(this.inventory.product.id, [
      Validators.required,
    ]);

    this.inventoryForm = new FormGroup({
      availableQuantity: this.availableQuantity,
      description: this.description,
      product: this.product,
    });

    this.productService
      .getMyProducts({ limit: 500, page: 1 })
      .subscribe((response: any) => {
        this.productOptions = response.data.map((product: Product) => ({
          label: product.name,
          value: product.id,
        }));
      });
  }

  onSubmit() {
    this.alreadySubmitted = true;
    if (this.inventoryForm.valid) {
      this.isLoading = true;
      const newInventory = {
        availableQuantity: this.availableQuantity.value,
        description: this.description.value,
        product: { id: this.product.value },
      };
      this.inventoryService
        .updateInventory(this.inventory.id, newInventory as Inventory)
        .subscribe(
          (response) => {
            this.alertService.showToast(
              this.translateService.instant('inventory.updated', {
                id: this.inventory.id,
              }),
              'top'
            );
            this.dialogRef.close(response);
            this.isLoading = false;
          },
          (error) => {
            console.log(error);
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;
          }
        );
    }
  }
}
