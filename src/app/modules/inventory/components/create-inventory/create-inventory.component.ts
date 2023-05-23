import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Inventory from 'src/app/core/interfaces/inventory';
import Product from 'src/app/core/interfaces/product';
import { SelectOption } from 'src/app/core/interfaces/select';
import { InventoryService } from 'src/app/core/services/inventory/inventory.service';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-create-inventory',
  templateUrl: './create-inventory.component.html',
})
export class CreateInventoryComponent {
  inventoryForm: FormGroup;

  availableQuantity: FormControl;
  description: FormControl;
  product: FormControl;

  productOptions: SelectOption[] = [];

  alreadySubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateInventoryComponent>,
    @Inject(MAT_DIALOG_DATA) public nit: string,
    private readonly inventoryService: InventoryService,
    private readonly productService: ProductService
  ) {
    this.availableQuantity = new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]);
    this.description = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.product = new FormControl('', [Validators.required]);

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
        company: { nit: this.nit },
      };
      this.inventoryService
        .createInventory(newInventory as Inventory)
        .subscribe(
          (response) => {
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
