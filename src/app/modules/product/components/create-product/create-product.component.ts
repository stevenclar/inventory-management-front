import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent {
  productForm: FormGroup;

  name: FormControl;
  description: FormControl;
  price: FormControl;
  measure: FormControl;

  alreadySubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    private readonly productService: ProductService
  ) {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.description = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.price = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.measure = new FormControl('', [
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
      this.productService.createProduct(this.productForm.value).subscribe(
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
