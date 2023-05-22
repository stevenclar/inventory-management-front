import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import Product from 'src/app/core/interfaces/product';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent {
  productForm: FormGroup;

  name: FormControl;
  description: FormControl;
  price: FormControl;
  measure: FormControl;

  alreadySubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private readonly productService: ProductService,
    private readonly alertService: AlertService,
    private readonly translateService: TranslateService
  ) {
    this.name = new FormControl(this.product.name, [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.description = new FormControl(this.product.description, [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.price = new FormControl(this.product.price, [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.measure = new FormControl(this.product.measure, [
      Validators.required,
      Validators.minLength(3),
    ]);

    this.productForm = new FormGroup({
      name: this.name,
      description: this.description,
      price: this.price,
      measure: this.measure,
    });
  }

  onSubmit() {
    this.alreadySubmitted = true;
    if (this.productForm.valid) {
      this.isLoading = true;
      this.productService
        .updateProduct(this.product.id, this.productForm.value)
        .subscribe(
          (response) => {
            this.alertService.showToast(
              this.translateService.instant('product.updated', {
                id: this.product.id,
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
